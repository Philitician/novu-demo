import { serve } from "@novu/framework/next";
import { testWorkflow } from "@/lib/novu/workflows";
import { Novu } from "@novu/node";

export const { GET, POST, OPTIONS } = serve({ workflows: [testWorkflow] });

// // Ensure your Novu Secret Key is stored in your environment variables
// const novu = new Novu(process.env.NOVU_SECRET_KEY!);

// // Example of triggering the workflow
// async function triggerNewArticleNotification(
//   subscriberId: string,
//   articleDetails: {
//     articleTitle: string;
//     articleSummary: string;
//     articleUrl: string;
//     authorName: string;
//     readTimeMinutes: number;
//     publicationDate: string;
//     recipientFirstName: string;
//   }
// ) {
//   try {
//     await novu.trigger("new-article-notification-workflow", {
//       to: {
//         subscriberId: subscriberId,
//         // You can also include subscriber information here if needed,
//         // but for a hardcoded single subscriber, just the ID is enough.
//       },
//       payload: articleDetails,
//     });
//     console.log(
//       `New article notification triggered for subscriber ${subscriberId}`
//     );
//   } catch (error) {
//     console.error("Error triggering Novu workflow:", error);
//   }
// }

// // Example usage with a hardcoded subscriber ID and sample payload
// const hardcodedSubscriberId = "YOUR_HARDCODED_SUBSCRIBER_ID"; // Replace with an actual subscriber ID
// const exampleArticleDetails = {
//   articleTitle: "My Awesome New Article",
//   articleSummary: "This article talks about exciting new things.",
//   articleUrl: "https://example.com/articles/my-awesome-article",
//   authorName: "Author Name",
//   readTimeMinutes: 7,
//   publicationDate: "May 15, 2024",
//   recipientFirstName: "Philip", // Or fetch this from your subscriber data
// };

// triggerNewArticleNotification(hardcodedSubscriberId, exampleArticleDetails);
