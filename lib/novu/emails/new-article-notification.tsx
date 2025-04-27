import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
  Heading,
  render,
} from "@react-email/components";

// Define the props interface for the email template
interface NewArticleNotificationProps {
  articleTitle: string;
  articleSummary: string;
  articleUrl: string;
  authorName: string;
  readTimeMinutes: number;
  publicationDate: string;
  recipientFirstName: string;
}

// Define a type for the component that includes the static PreviewProps
type NewArticleNotificationComponent = React.FC<NewArticleNotificationProps> & {
  PreviewProps?: NewArticleNotificationProps;
};

const NewArticleNotification: NewArticleNotificationComponent = (props) => {
  const {
    articleTitle = "Den ultimate guiden til e-postmarkedsføring i 2025",
    articleSummary = "Lær de nyeste strategiene og beste praksisene for effektive e-postkampanjer i det kommende året.",
    articleUrl = "https://example.com/blogg/epost-markedsforing-guide-2025",
    authorName = "Jane Smith",
    readTimeMinutes = 5,
    publicationDate = "26. april 2025",
    recipientFirstName = "Philip",
  } = props;

  return (
    <Html lang="no" dir="ltr">
      <Head />
      <Preview>Ny artikkel: {articleTitle}</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] mx-auto p-[32px] max-w-[600px]">
            <Section>
              <Text className="text-gray-500 text-[14px] mb-[8px]">
                Nettopp publisert
              </Text>
              <Heading className="text-[24px] font-bold text-gray-900 mb-[16px]">
                {articleTitle}
              </Heading>

              <Text className="text-gray-600 mb-[24px]">
                Hei {recipientFirstName},
              </Text>

              <Text className="text-gray-600 mb-[16px]">
                Vi har nettopp publisert en ny artikkel som vi tror du kan være
                interessert i.
              </Text>

              <Section className="bg-gray-50 p-[16px] rounded-[8px] mb-[24px]">
                <Text className="text-gray-800 mb-[8px]">
                  <strong>{articleTitle}</strong>
                </Text>
                <Text className="text-gray-600 mb-[16px]">
                  {articleSummary}
                </Text>
                <Text className="text-gray-500 text-[14px] mb-[4px]">
                  Av {authorName} • {readTimeMinutes} min lesetid • Publisert{" "}
                  {publicationDate}
                </Text>
              </Section>

              <Button
                href={articleUrl}
                className="bg-blue-600 text-white font-bold py-[12px] px-[24px] rounded-[4px] no-underline text-center block box-border"
              >
                Les artikkelen
              </Button>

              <Text className="text-gray-600 mt-[32px]">
                Vil du utforske mer innhold? Besøk vårt{" "}
                <Link
                  href="https://example.com/blogg"
                  className="text-blue-600"
                >
                  bloggarkiv
                </Link>
                .
              </Text>

              <Text className="text-gray-600">
                God lesing,
                <br />
                Example-teamet
              </Text>
            </Section>

            <Section className="border-t border-gray-200 mt-[32px] pt-[24px]">
              <Text className="text-gray-500 text-[12px] m-0">
                © {new Date().getFullYear()} Example Selskap. Alle rettigheter
                reservert.
              </Text>
              <Text className="text-gray-500 text-[12px] m-0">
                123 Eksempelgaten, Oslo, Norge
              </Text>
              <Text className="text-gray-500 text-[12px] mt-[8px]">
                <Link
                  href="https://example.com/preferences"
                  className="text-gray-500 underline"
                >
                  Administrer preferanser
                </Link>{" "}
                •{" "}
                <Link
                  href="https://example.com/unsubscribe"
                  className="text-gray-500 underline"
                >
                  Avslutt abonnement
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

NewArticleNotification.PreviewProps = {
  articleTitle: "Den ultimate guiden til e-postmarkedsføring i 2025",
  articleSummary:
    "Lær de nyeste strategiene og beste praksisene for effektive e-postkampanjer i det kommende året.",
  articleUrl: "https://example.com/blogg/epost-markedsforing-guide-2025",
  authorName: "Jane Smith",
  readTimeMinutes: 5,
  publicationDate: "26. april 2025",
  recipientFirstName: "Philip",
};

export default NewArticleNotification;

export const renderNewArticleNotificationEmail = (
  props: NewArticleNotificationProps
) => {
  return render(<NewArticleNotification {...props} />);
};
