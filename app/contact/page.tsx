import type { Metadata } from 'next'
import { ContactForm } from '@/components/contact-form'
import { profile } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Contact — Oana Grigore',
  description: 'Get in touch to discuss a project or collaboration.',
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <section className="pt-24 pb-16 md:pt-32 md:pb-20">
        <p className="text-sm text-muted-foreground">Contact</p>
        <h1 className="mt-6 max-w-3xl text-balance text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl">
          Let&apos;s make something considered together.
        </h1>
      </section>

      <section className="grid grid-cols-1 gap-12 border-t border-border/60 py-16 md:grid-cols-[1fr_1.4fr] md:gap-16 md:py-20">
        <div className="space-y-10">
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            I&apos;m currently taking on select freelance and contract projects.
            Tell me a bit about what you&apos;re building and I&apos;ll get back
            to you within a couple of days.
          </p>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <a
                href={`mailto:${profile.email}`}
                className="mt-1 block text-lg text-foreground transition-colors hover:text-primary"
              >
                {profile.email}
              </a>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <a
                href={`tel:${profile.phone.replace(/\s/g, '')}`}
                className="mt-1 block text-lg text-foreground transition-colors hover:text-primary"
              >
                {profile.phone}
              </a>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Elsewhere</p>
              <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
                {profile.social.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground transition-colors hover:text-primary"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <ContactForm />
      </section>
    </div>
  )
}
