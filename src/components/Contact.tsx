import AuditComment from "@/components/AuditComment";
import BookingCta from "@/components/BookingCta";
import ContactForm from "@/components/ContactForm";
import { CONTACT, SITE } from "@/content/site";
import { Reveal, Section } from "@/components/ui";

export default function Contact() {
  return (
    <Section id="contact" index="07" label="Contact">
      <div className="grid grid-cols-12 gap-x-6 gap-y-14">
        {/* Left — verified coordinates & consultation options */}
        <div className="col-span-12 lg:col-span-4">
          <Reveal>
            <h2 id="contact-title" className="display-lg font-display text-navy">
              {CONTACT.title}
            </h2>
            <p className="mt-7 text-[1.0625rem] leading-[1.75] text-ink/80">{CONTACT.body}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="rule-double mt-10 space-y-6 pt-7">
              <div>
                <dt className="eyebrow text-mute">Adresse</dt>
                <dd className="mt-2 font-display text-lg leading-snug text-navy">
                  {SITE.name}
                  <br />
                  {SITE.address.street}
                  <br />
                  {SITE.address.postalCode} {SITE.address.locality}
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-mute">Téléphone</dt>
                <dd className="mt-2">
                  {/* TODO: Verify with lawyer: Phone */}
                  <AuditComment text="TODO: Verify with lawyer: Phone" />
                  <a
                    href={SITE.phoneHref}
                    className="link-underline font-display text-lg text-navy hover:text-bronze"
                  >
                    {SITE.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-mute">Adresse électronique</dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${SITE.email}`}
                    className="link-underline break-all font-display text-lg text-navy hover:text-bronze"
                  >
                    {SITE.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-mute">Modalités de rendez-vous</dt>
                <dd className="mt-2">
                  <ul className="space-y-1.5 font-display text-lg leading-snug text-navy">
                    {SITE.appointmentOptions.map((option) => (
                      <li key={option} className="flex items-center gap-3">
                        <span aria-hidden="true" className="h-px w-4 shrink-0 bg-gold" />
                        <span>{option}</span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        {/* Right — direct booking card, then the form */}
        <div className="col-span-12 lg:col-span-7 lg:col-start-6">
          <Reveal delay={0.08}>
            <div className="border border-rule bg-ivory p-6 sm:p-8">
              <p className="eyebrow text-bronze">Réservation en ligne</p>
              <h3 className="mt-3 font-display text-[1.35rem] leading-snug text-navy">
                Réserver directement un créneau
              </h3>
              <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-ink/80">
                Premier rendez-vous au cabinet (Paris), en visioconférence ou par téléphone.
              </p>
              <BookingCta className="mt-5" showSecondary={false} notes />
            </div>
          </Reveal>
          <Reveal delay={0.12} className="mt-8">
            <ContactForm formId="f" />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
