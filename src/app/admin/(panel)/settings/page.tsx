import type { Metadata } from "next";
import { admin, Card, Field, PageTitle, Submit } from "@/components/admin/AdminUI";
import { readSettings } from "@/lib/cms-actions";
import { saveSettingsAction } from "@/lib/cms-actions";

export const metadata: Metadata = {
  title: { absolute: "Réglages du site — Administration" },
  robots: { index: false, follow: false },
};

type SettingsMap = Record<string, Record<string, unknown>>;

const str = (value: unknown) => (typeof value === "string" || typeof value === "number" ? String(value) : "");

export default async function SettingsPage() {
  const rows = await readSettings();
  const map: SettingsMap = Object.fromEntries(rows.map((r) => [r.key, (r.value ?? {}) as Record<string, unknown>]));
  const identity = map.identity ?? {};
  const contact = map.contact ?? {};
  const address = (contact.address ?? {}) as Record<string, string>;
  const cta = map.cta ?? {};
  const booking = map.booking ?? {};
  const reviews = map.reviews ?? {};
  const protectedTexts = map["protected-texts"] ?? {};

  return (
    <div>
      <PageTitle
        title="Réglages du site"
        subtitle="Identité du cabinet, coordonnées, libellés des appels à l’action, réservation et badge d’avis. Les enregistrements se répercutent immédiatement sur le site."
      />

      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Identité */}
        <Card>
          <h2 className="font-display text-[1.2rem] text-[#111827]">Identité du cabinet</h2>
          <form action={saveSettingsAction} className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input type="hidden" name="key" value="identity" />
            <Field label="Nom" name="name" defaultValue={str(identity.name)} required />
            <Field label="Marque (mot-symbole)" name="wordmark" defaultValue={str(identity.wordmark)} />
            <Field label="Suffixe" name="wordmarkSuffix" defaultValue={str(identity.wordmarkSuffix)} />
            <Field label="Raison sociale" name="legalName" defaultValue={str(identity.legalName)} />
            <Field label="Domaine" name="domain" defaultValue={str(identity.domain)} />
            <Field label="URL du site" name="url" defaultValue={str(identity.url)} />
            <Field label="Accroche" name="tagline" defaultValue={str(identity.tagline)} />
            <Field label="Barreau" name="barreau" defaultValue={str(identity.barreau)} />
            <Field label="SIREN" name="siren" defaultValue={str(identity.siren)} />
            <Field label="Toque" name="toque" defaultValue={str(identity.toque)} />
            <Field label="Serment" name="oathDate" defaultValue={str(identity.oathDate)} />
            <Field label="Fondation (année)" name="founded" type="number" defaultValue={str(identity.founded)} />
            <div className="sm:col-span-2">
              <Submit>Enregistrer l’identité</Submit>
            </div>
          </form>
        </Card>

        {/* Coordonnées */}
        <Card>
          <h2 className="font-display text-[1.2rem] text-[#111827]">Coordonnées</h2>
          <form action={saveSettingsAction} className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input type="hidden" name="key" value="contact" />
            <Field label="Téléphone affiché" name="phone" defaultValue={str(contact.phone)} />
            <Field label="Téléphone E.164" name="phoneE164" defaultValue={str(contact.phoneE164)} />
            <Field label="Adresse électronique" name="email" type="email" defaultValue={str(contact.email)} />
            <Field label="Rue" name="address.street" defaultValue={address.street ?? ""} />
            <Field label="Code postal" name="address.postalCode" defaultValue={address.postalCode ?? ""} />
            <Field label="Ville" name="address.locality" defaultValue={address.locality ?? ""} />
            <Field label="Arrondissement (affiché)" name="address.arrondissement" defaultValue={address.arrondissement ?? ""} />
            <Field label="Pays (code)" name="address.countryCode" defaultValue={address.countryCode ?? "FR"} />
            <div className="sm:col-span-2">
              <Submit>Enregistrer les coordonnées</Submit>
            </div>
          </form>
        </Card>

        {/* CTA */}
        <Card>
          <h2 className="font-display text-[1.2rem] text-[#111827]">Appels à l’action</h2>
          <form action={saveSettingsAction} className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input type="hidden" name="key" value="cta" />
            <Field label="Principal (réservation)" name="booking" defaultValue={str(cta.booking)} />
            <Field label="Secondaire (formulaire)" name="write" defaultValue={str(cta.write)} />
            <Field label="Bouton du formulaire" name="submit" defaultValue={str(cta.submit)} />
            <div className="sm:col-span-2">
              <Submit>Enregistrer les libellés</Submit>
            </div>
          </form>
        </Card>

        {/* Réservation */}
        <Card>
          <h2 className="font-display text-[1.2rem] text-[#111827]">Réservation Cal.com</h2>
          <form action={saveSettingsAction} className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input type="hidden" name="key" value="booking" />
            <Field label="Identifiant Cal.com (calLink)" name="calLink" defaultValue={str(booking.calLink)} />
            <Field label="URL de repli" name="calUrl" defaultValue={str(booking.calUrl)} />
            <div className="sm:col-span-2">
              <Submit>Enregistrer la réservation</Submit>
            </div>
          </form>
        </Card>

        {/* Avis */}
        <Card>
          <h2 className="font-display text-[1.2rem] text-[#111827]">Badge d’avis Google</h2>
          <p className={`mt-2 text-xs leading-relaxed ${admin.muted}`}>
            À confirmer avec l’avocat avant publication : exactitude de la note et compatibilité avec les
            règles de publicité de la profession.
          </p>
          <form action={saveSettingsAction} className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input type="hidden" name="key" value="reviews" />
            <Field label="Note affichée" name="rating" defaultValue={str(reviews.rating)} />
            <Field label="Nombre d’avis" name="count__number" type="number" defaultValue={str(reviews.count)} />
            <div className="sm:col-span-2">
              <Field label="URL de la fiche Google" name="mapsUrl" defaultValue={str(reviews.mapsUrl)} />
            </div>
            <label className="flex items-center gap-2 text-sm text-[#111827] sm:col-span-2">
              <input type="hidden" name="enabled__bool" value="off" />
              <input
                type="checkbox"
                name="enabled__bool"
                defaultChecked={reviews.enabled !== false}
                className="h-4 w-4 accent-[#111827]"
              />
              Afficher le badge sur le site
            </label>
            <div className="sm:col-span-2">
              <Submit>Enregistrer le badge</Submit>
            </div>
          </form>
        </Card>

        {/* Texte protégé */}
        <Card>
          <h2 className="font-display text-[1.2rem] text-[#111827]">Texte protégé (lecture seule)</h2>
          <p className={`mt-2 text-sm leading-relaxed ${admin.muted}`}>{str(protectedTexts.confidentialityNotice)}</p>
          <p className="mt-4 border-t border-[#E3DED4] pt-3 text-xs leading-relaxed text-[#6B6B66]">
            Ce texte engage la déontologie du cabinet : il ne peut être modifié que dans le code, après
            relecture.
          </p>
        </Card>
      </div>
    </div>
  );
}
