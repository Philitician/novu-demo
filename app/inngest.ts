import { Inngest, EventSchemas } from "inngest";
import { z } from "zod";

// Create a client to send and receive events
export const inngest = new Inngest({
  id: "novu-demo",
  eventSchemas: new EventSchemas().fromZod({
    "test/trigger-notification": {
      data: z.object({}),
    },
    "test/create-topic": {
      data: z.object({
        topicKey: z.string(),
        topicName: z.string(),
      }),
    },
    "test/subscribe-to-topic": {
      data: z.object({
        topicKey: z.string(),
        subscribers: z.array(z.string()),
      }),
    },
    "test/remove-from-topic": {
      data: z.object({
        topicKey: z.string(),
        subscribers: z.array(z.string()),
      }),
    },
    "test/list-topics": {
      data: z.object({}),
    },
  }),
});
