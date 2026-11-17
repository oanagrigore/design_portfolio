import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'
import { profile } from '@/lib/content'
import { CottageScene } from '@/components/cottage-scene'
import { ScrollCue } from '@/components/scroll-cue'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    "Get in touch with Oana Grigore, Senior Product Designer in Bucharest: accessibility, design systems and complex B2B SaaS and enterprise products. Email, LinkedIn, GitHub and Dribbble.",
  alternates: { canonical: '/contact' },
}

const label = 'text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground'

export default function ContactPage() {
  return (
    <main className="relative">
      <CottageScene />
      <ScrollCue targetId="contact-details" />

      {/* Content rises into the bottom fade of the scene */}
      <section id="contact-details" className="cs-pull relative z-10 mx-auto max-w-6xl px-4 pb-32 sm:px-6 md:pb-48">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-7">
            <p className={label}>Contact</p>
            <h1 className="mt-4 text-balance text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Say hello.
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Want to talk accessibility, design systems, or a product with more user roles than anyone planned for? Questions about a case study, a speaking or writing idea, or just a hello: my inbox is open.
            </p>
          </div>

          <dl className="divide-y divide-white/10 border-t border-white/10 lg:col-span-5 lg:mt-1">
            <div className="py-5">
              <dt className={label}>Email</dt>
              <dd className="mt-2">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex min-h-11 items-center break-all text-lg font-medium text-foreground underline decoration-white/20 underline-offset-[6px] transition-colors hover:text-pink-300 hover:decoration-pink-300 sm:text-xl"
                >
                  {profile.email}
                </a>
              </dd>
            </div>
            <div className="py-5">
              <dt className={label}>Elsewhere</dt>
              <dd className="mt-2">
                <ul className="flex flex-wrap gap-x-6">
                  {profile.social.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-1 text-lg text-foreground transition-colors hover:text-pink-300"
                      >
                        {s.label}
                        <ArrowUpRight aria-hidden="true" className="size-4 text-muted-foreground" />
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </main>
  )
}
