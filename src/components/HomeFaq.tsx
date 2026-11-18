import FaqList from "@/components/FaqList";
import { Reveal, Section } from "@/components/ui";
import { HOME_FAQS } from "@/content/site";

export default function HomeFaq() {
  return (
    <Section id="faq" index="05" label="FAQ">
      <div className="grid grid-cols-12 gap-x-6 gap-y-8">
        <Reveal className="col-span-12 lg:col-span-6">
          <h2 id="faq-title" className="display-lg font-display text-navy">
            Questions fréquentes en contentieux des affaires.
          </h2>
        </Reveal>
        <Reveal delay={0.08} className="col-span-12 lg:col-span-5 lg:col-start-8">
          <p className="text-[1.0625rem] leading-[1.6] text-ink/80">
            Injonction de payer, blocage entre associés, honoraires, mise en demeure ou assignation,
            premier rendez-vous : les réponses essentielles.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.12} className="mt-14 max-w-[72ch]">
        <FaqList items={HOME_FAQS} />
        <p className="mt-8 text-xs leading-relaxed text-mute">
          Réponses fournies à titre d’information générale — chaque situation fait l’objet d’une
          analyse propre au vu des pièces.
        </p>
      </Reveal>
    </Section>
  );
}
