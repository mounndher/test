import { FIRST_CONTACT } from "@/content/site";
import { Reveal, Section } from "@/components/ui";

/** Simple 3-step block reducing the perceived effort of a first contact. */
export default function PremierContact() {
  return (
    <Section id="premier-contact" index="06" label={FIRST_CONTACT.eyebrow} tone="paper">
      <Reveal>
        <h2 id="premier-contact-title" className="display-lg max-w-[22ch] font-display text-navy">
          {FIRST_CONTACT.title}
        </h2>
      </Reveal>

      <ol className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
        {FIRST_CONTACT.steps.map((step, i) => (
          <li key={step.title}>
            <Reveal delay={i * 0.08}>
              <div className="border-t border-gold pt-6">
                <span aria-hidden="true" className="font-display text-4xl italic text-bronze">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-display text-[1.35rem] leading-snug text-navy">
                  <span className="sr-only">Étape {i + 1} : </span>
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[34ch] text-[1rem] leading-[1.6] text-ink/80">
                  {step.body}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
