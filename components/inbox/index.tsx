"use client";

import { Inbox } from "@novu/nextjs";

export function Novu({
  userId,
  organizationId,
}: {
  userId: string;
  organizationId: string | undefined;
}) {
  const subscriberId = [organizationId, userId].filter(Boolean).join(":");
  return (
    <Inbox
      applicationIdentifier={
        process.env.NEXT_PUBLIC_NOVU_APPLICATION_IDENTIFIER!
      }
      subscriberId={subscriberId}
      tabs={[
        {
          label: "Alle varsler",
          filter: { tags: [] },
        },
        {
          label: "Nyheter",
          filter: { tags: ["newsletter"] },
        },
      ]}
      localization={{
        locale: "nb-NO",
        "inbox.filters.dropdownOptions.unread": "Kun uleste",
        "inbox.filters.dropdownOptions.default": "Uleste og leste",
        "inbox.filters.dropdownOptions.archived": "Arkivert",
        "inbox.filters.labels.unread": "Uleste",
        "inbox.filters.labels.default": "Innboks",
        "inbox.filters.labels.archived": "Arkivert",
        "notifications.emptyNotice":
          "Stille for øyeblikket. Kom tilbake senere.",
        "notifications.actions.readAll": "Merk alle som lest",
        "notifications.actions.archiveAll": "Arkiver alle",
        "notifications.actions.archiveRead": "Arkiver leste",
        "notifications.newNotifications": ({
          notificationCount,
        }: {
          notificationCount: number;
        }) =>
          `${notificationCount > 99 ? "99+" : notificationCount} nye ${
            notificationCount === 1 ? "varsel" : "varsler"
          }`,
        "notification.actions.read.tooltip": "Merk som lest",
        "notification.actions.unread.tooltip": "Merk som ulest",
        "notification.actions.archive.tooltip": "Arkiver",
        "notification.actions.unarchive.tooltip": "Gjenopprett",
        "preferences.title": "Innstillinger",
        "preferences.emptyNotice":
          "Ingen spesifikke varslingsinnstillinger ennå.",
        "preferences.global": "Globale innstillinger",
        "preferences.workflow.disabled.notice":
          "Kontakt administrator for å aktivere abonnementsadministrasjon for dette kritiske varselet.",
        "preferences.workflow.disabled.tooltip":
          "Kontakt administrator for å redigere",
      }}
      appearance={{
        variables: {
          colorPrimary: "#841528",
          colorForeground: "#0E121B",
        },
      }}
    />
  );
}
