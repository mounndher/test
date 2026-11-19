import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { admin, Card, Field, PageTitle, Submit } from "@/components/admin/AdminUI";
import { readExpertises, saveExpertiseAction } from "@/lib/cms-actions";
import { CONTACT_SUBJECTS } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: "Modifier une expertise — Administration" },
  robots: { index: false, follow: false },
};

const join = (value: unknown) =>
  Array.isArray(value)
    ? value
        .map((item) => (typeof item === "string" ? item : JSON.stringify(item)))
        .join("\n")
    : "";

export default async function ExpertiseEditorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const expertises = await readExpertises();
  const expertise = expertises.find((e) => e.slug === slug);
  if (!expertise) notFound();

  const asArray = (value: unknown) => (Array.isArray(value) ? value : []);

  return (
    <div>
      <PageTitle
        title={expertise.domain}
        subtitle={`/${expertise.slug} — contenu détaillé de la page publique. Les listes s’éditent une valeur par ligne.`}
        action={
          <Link href="/admin/expertises" className={admin.btnGhost}>
            ← Toutes les expertises
          </Link>
        }
      />

      <Card className="mt-8">
        <form action={saveExpertiseAction} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <input type="hidden" name="id" value={expertise.id} />
          <Field label="Accroche (carte d’accueil)" name="hook" defaultValue={expertise.hook ?? ""} />
          <Field label="Surtitre" name="eyebrow" defaultValue={expertise.eyebrow ?? ""} />
          <div className="sm:col-span-2">
            <Field label="Titre H1" name="h1" defaultValue={expertise.h1 ?? ""} />
          </div>
          <div className="sm:col-span-2">
            <Field label="Introduction (un paragraphe par ligne)" name="intro" rows={4} defaultValue={join(expertise.intro)} />
          </div>

          <Field label="Titre « situations »" name="situationsTitle" defaultValue={expertise.situationsTitle ?? ""} />
          <Field label="Texte d’introduction des situations" name="situationsText" defaultValue={expertise.situationsText ?? ""} />
          <div className="sm:col-span-2">
            <Field label="Situations (une par ligne)" name="situationsBullets" rows={5} defaultValue={join(expertise.situationsBullets)} />
          </div>

          <Field label="Titre « enjeux »" name="enjeuxTitle" defaultValue={expertise.enjeuxTitle ?? ""} />
          <Field label="Titre « conduite »" name="conduiteTitle" defaultValue={expertise.conduiteTitle ?? ""} />
          <div className="sm:col-span-2">
            <Field label="Enjeux — paragraphes (un par ligne)" name="enjeuxParagraphs" rows={4} defaultValue={join(expertise.enjeuxParagraphs)} />
          </div>
          <div className="sm:col-span-2">
            <Field label="Points d’examen (un par ligne)" name="enjeuxPoints" rows={4} defaultValue={join(expertise.enjeuxPoints)} />
          </div>
          <div className="sm:col-span-2">
            <Field label="Conduite — paragraphes (un par ligne)" name="conduiteParagraphs" rows={4} defaultValue={join(expertise.conduiteParagraphs)} />
          </div>

          <Field label="Titre « scénarios »" name="scenariosTitle" defaultValue={expertise.scenariosTitle ?? ""} />
          <div className="sm:col-span-2">
            <Field
              label="Scénarios (JSON : tableau d’objets titre/corps)"
              name="scenarios_info"
              rows={3}
              defaultValue={JSON.stringify(asArray(expertise.scenarios), null, 1)}
              hint="Édition structurée via la page publique ; ce champ est informatif."
            />
          </div>

          <div>
            <label htmlFor="f-contactSubject" className={admin.label}>
              Sujet présélectionné dans le formulaire
            </label>
            <select
              id="f-contactSubject"
              name="contactSubject"
              defaultValue={expertise.contactSubject}
              className={admin.input}
            >
              {CONTACT_SUBJECTS.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <Submit>Enregistrer l’expertise</Submit>
          </div>
        </form>
      </Card>
    </div>
  );
}
