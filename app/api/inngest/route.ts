import { serve } from "inngest/next";
import { inngest } from "@/app/inngest";
// Use the Node SDK for backend operations like topic management
import { Novu } from "@novu/api";

const novu = new Novu({ secretKey: process.env.NOVU_SECRET_KEY! }); // Ensure NOVU_SECRET_KEY is set

// Create your functions here
const triggerNotification = inngest.createFunction(
  { id: "trigger-notification" },
  { event: "test/trigger-notification" },
  async ({ event, step }) => {
    // Wrap Novu call in step.run for observability and retries
    await step.run("trigger-novu-notification", async () => {
      await novu.trigger({
        workflowId: "ny-artikkel-er-ute",
        to: {
          subscriberId: process.env.NEXT_PUBLIC_NOVU_SUBSCRIBER_ID!,
        },
        payload: {},
      });
    });
    return { message: "Notification triggered" };
  }
);

const createTopic = inngest.createFunction(
  { id: "create-topic" },
  { event: "test/create-topic" },
  async ({ event, step }) => {
    const { topicKey, topicName } = event.data;

    const topic = await step.run("create-novu-topic", async () => {
      return novu.topics.create({
        key: topicKey,
        name: topicName,
      });
    });

    console.dir(topic, { depth: null });

    return {
      message: `Topic '${topicName}' (${topicKey}) created.`,
      topicKey: topicKey,
    };
  }
);

const subscribeToTopic = inngest.createFunction(
  { id: "subscribe-to-topic" },
  { event: "test/subscribe-to-topic" },
  async ({ event, step }) => {
    const { topicKey, subscribers } = event.data;

    // ensure subs exists first
    await step.run("ensure-subs-exists", async () => {
      await Promise.all(
        subscribers.map((subscriberId: string) =>
          novu.subscribers.create(
            { subscriberId, locale: "nb-NO" },
            `create-${subscriberId}` // idempotency key
          )
        )
      );
    });

    const topicSubscribers = await step.run(
      "subscribe-to-novu-topic",
      async () => {
        const {
          result: { failed, succeeded },
        } = await novu.topics.subscribers.assign({ subscribers }, topicKey);
        if (failed?.notFound?.length) {
          throw new Error(
            `Failed to attach ${failed.notFound.join()} to topic ${topicKey}`
          );
        }
        return {
          succeeded,
          failed,
        };
      }
    );

    return {
      message: `Subscribers ${topicSubscribers} subscribed to topic ${topicKey}.`,
    };
  }
);

const removeFromTopic = inngest.createFunction(
  { id: "remove-from-topic" },
  { event: "test/remove-from-topic" },
  async ({ event, step }) => {
    const { topicKey, subscribers } = event.data;

    const topicSubscribers = await step.run(
      "remove-from-novu-topic",
      async () => {
        return novu.topics.subscribers.remove({ subscribers }, topicKey);
      }
    );

    return {
      message: `Subscribers ${topicSubscribers} removed from topic ${topicKey}.`,
    };
  }
);

const listTopics = inngest.createFunction(
  { id: "list-topics" },
  { event: "test/list-topics" },
  async ({ event, step }) => {
    console.log("Listing topics");
    const topics = await step.run("list-novu-topics", async () => {
      return novu.topics.list({});
    });

    console.dir(topics, { depth: null });

    return {
      message: `Topics listed.`,
      topics: topics.result.data,
    };
  }
);

// const createWorkflow = inngest.createFunction(
//   { id: "create-workflow" },
//   { event: "test/create-workflow" },
//   async ({ event, step }) => {
//     const { workflowId } = event.data;

//     const workflow = await step.run("create-workflow", async () => {
//       return novu.workflows.create({
//         name: workflowId,
//       });
//     });
//   }
// );

// Create an API that serves zero, one, or multiple functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    triggerNotification,
    createTopic,
    subscribeToTopic,
    removeFromTopic,
    listTopics,
  ],
});
