import { workflow } from "@novu/framework";
import { renderEmail } from "@/lib/novu/emails/test-email";
import { renderNewArticleNotificationEmail } from "@/lib/novu/emails/new-article-notification";
import { z } from "zod";

export const testWorkflow = workflow(
  "test-workflow",
  async ({ step, payload }) => {
    await step.email(
      "send-email",
      async (controls) => ({
        subject: controls.subject,
        body: await renderEmail(payload.userName),
      }),
      {
        controlSchema: z.object({
          subject: z
            .string()
            .default("A Successful Test on Novu from {{userName}}"),
        }),
      }
    );
  },
  {
    payloadSchema: z.object({
      userName: z.string().default("John Doe"),
    }),
  }
);

export const newArticleNotificationWorkflow = workflow(
  "new-article-notification-workflow",
  async ({ step, payload }) => {
    await step.email("send-new-article-email", async () => ({
      subject: `Ny artikkel: ${payload.articleTitle}`,
      body: await renderNewArticleNotificationEmail({
        articleTitle: payload.articleTitle,
        articleSummary: payload.articleSummary,
        articleUrl: payload.articleUrl,
        authorName: payload.authorName,
        readTimeMinutes: payload.readTimeMinutes,
        publicationDate: payload.publicationDate,
        recipientFirstName: payload.recipientFirstName,
      }),
    }));
  },
  {
    payloadSchema: z.object({
      articleTitle: z.string(),
      articleSummary: z.string(),
      articleUrl: z.string(),
      authorName: z.string(),
      readTimeMinutes: z.number(),
      publicationDate: z.string(),
      recipientFirstName: z.string(),
    }),
  }
);
