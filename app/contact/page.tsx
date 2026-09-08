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

      <section className="gap-12 border-t border-border/60 py-16 md:grid-cols-[1fr_1.4fr] md:gap-16 md:py-20">
        <div className="space-y-10">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-3 py-1 text-sm text-foreground">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-pink-500 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-pink-500" />
              </span>
              Available for project-based or full-time work
            </span>
            <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
              I&apos;m currently looking to take on project-based or full-time
              roles. Tell me a bit about what you&apos;re building and I&apos;ll
              get back to you within a couple of days.
            </p>
          </div>

          <div className="grid space-y-6">
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

        {/* <ContactForm /> */}
      </section>
    </div>
  )
}
