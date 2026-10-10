import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { profile } from '@/lib/content'

const label = 'text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground'

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className={label}>Contact</p>
            <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Hiring a senior product designer who ships accessible, systemised products?
            </h2>
            <Link
              href="/contact"
              className="mt-8 inline-flex min-h-12 items-center gap-2.5 rounded-full bg-linear-to-r from-pink-500 via-rose-500 to-purple-500 px-6 font-medium text-white transition-opacity hover:opacity-90"
            >
              Get in touch <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="flex flex-col gap-1 md:items-end">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex min-h-11 items-center text-sm text-foreground transition-colors hover:text-pink-400"
            >
              {profile.email}
            </a>
            <ul className="flex flex-wrap gap-x-5">
              {profile.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {s.label}
                    <ArrowUpRight aria-hidden="true" className="size-3.5" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </span>
          <span>Based in {profile.location} · Open to remote roles in Europe</span>
        </div>
      </div>
    </footer>
  )
}
