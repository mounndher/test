import type { Metadata } from "next";
import { admin, Card, PageTitle } from "@/components/admin/AdminUI";
import {
  deleteMessageAction,
  readMessages,
  toggleMessageStatusAction,
} from "@/lib/cms-actions";

export const metadata: Metadata = {
  title: { absolute: "Messages — Administration Blexmann Avocats" },
  robots: { index: false, follow: false },
};

export default async function AdminMessagesPage() {
  const messages = await readMessages();
  const unreadCount = messages.filter((m) => m.status === "unread").length;

  return (
    <div>
      <PageTitle
        title="Messages de contact"
        subtitle={`${messages.length} demande${messages.length > 1 ? "s" : ""} reçue${messages.length > 1 ? "s" : ""} depuis le formulaire public (${unreadCount} non lue${unreadCount > 1 ? "s" : ""}).`}
      />

      {messages.length === 0 ? (
        <Card className="mt-8">
          <p className={`text-sm ${admin.muted}`}>
            Aucune demande reçue pour le moment. Les messages envoyés depuis la page Contact apparaîtront ici automatiquement.
          </p>
        </Card>
      ) : (
        <div className="mt-8 space-y-4">
          {messages.map((msg) => {
            const isUnread = msg.status === "unread";
            return (
              <Card
                key={msg.id}
                className={isUnread ? "border-l-4 border-l-[#8C6D46]" : "opacity-85"}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-[#111827]">{msg.name}</span>
                      {msg.company && (
                        <span className={`text-xs ${admin.muted}`}>— {msg.company}</span>
                      )}
                      {isUnread ? (
                        <span className="bg-[#8C6D46] px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wider text-white">
                          Nouveau
                        </span>
                      ) : (
                        <span className="bg-[#EFEBE2] px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wider text-[#6B6B66]">
                          Lu
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-[#6B6B66]">
                      <a href={`mailto:${msg.email}`} className="underline hover:text-[#111827]">
                        {msg.email}
                      </a>
                      {msg.phone ? ` · ${msg.phone}` : ""}
                      {msg.mode ? ` · ${msg.mode}` : ""}
                    </p>
                    <p className={`mt-2 text-xs font-semibold uppercase tracking-wider ${admin.accent}`}>
                      Sujet : {msg.subject}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs text-[#6B6B66]">
                      {new Date(msg.createdAt).toLocaleString("fr-FR", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </span>
                    <form action={toggleMessageStatusAction}>
                      <input type="hidden" name="id" value={msg.id} />
                      <input type="hidden" name="status" value={isUnread ? "read" : "unread"} />
                      <button type="submit" className={admin.btnGhost}>
                        {isUnread ? "Marquer comme lu" : "Marquer non lu"}
                      </button>
                    </form>
                    <form action={deleteMessageAction}>
                      <input type="hidden" name="id" value={msg.id} />
                      <button type="submit" className={admin.btnDanger}>
                        Supprimer
                      </button>
                    </form>
                  </div>
                </div>

                <div className="mt-4 border-t border-[#EFEBE2] pt-4 text-sm leading-relaxed text-[#111827] whitespace-pre-wrap">
                  {msg.message}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}