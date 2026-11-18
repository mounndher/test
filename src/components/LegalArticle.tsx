import Link from "next/link";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function LegalArticle({
  title,
  updated,
  eyebrow = "Informations légales",
  backHref = "/",
  backLabel = "← Retour à l’accueil",
  children,
}: {
  title: string;
  updated: string;
  eyebrow?: string;
  backHref?: string;
  backLabel?: string;
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      <main id="main" className="bg-ivory">
        <article className="mx-auto w-full max-w-[92rem] px-5 pb-24 pt-10 sm:px-8 lg:px-12 lg:pb-32 lg:pt-14">
          <Breadcrumbs items={[{ label: "Accueil", href: "/" }, { label: title }]} />
          <p className="eyebrow mt-10 text-bronze">{eyebrow}</p>
          <h1 className="display-lg mt-6 max-w-[22ch] font-display text-navy">{title}</h1>
          <div aria-hidden="true" className="mt-8 h-px w-full max-w-[28rem] bg-gold" />
          <p className="eyebrow mt-6 text-mute">Mise à jour — {updated}</p>

          <div className="mt-12 grid grid-cols-12 gap-x-6">
            <div className="col-span-12 lg:col-span-8 xl:col-span-7">
              <div className="space-y-8 [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-[1.5rem] [&_h2]:leading-snug [&_h2]:text-navy [&_h2]:first:mt-0 [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-[1.15rem] [&_h3]:text-navy [&_li]:mt-2 [&_li]:list-disc [&_li]:pl-4 [&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mt-3 [&_p]:max-w-[52ch] [&_p]:text-[1rem] [&_p]:leading-[1.75] [&_p]:text-ink/85 [&_strong]:font-semibold [&_strong]:text-navy [&_a]:text-navy">
                {children}
              </div>
            </div>
          </div>

          <Link
            href={backHref}
            className="eyebrow mt-16 inline-flex items-center gap-3 border-b border-gold pb-2 text-navy transition-colors hover:text-bronze"
          >
            {backLabel}
          </Link>
        </article>
      </main>
      <Footer />
    </>
  );
}
