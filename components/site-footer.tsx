import { ArrowUpRight } from 'lucide-react'
import { profile } from '@/lib/content'

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-md">
            <p className="text-sm text-muted-foreground">Get in touch</p>
            <h2 className="mt-3 text-pretty text-2xl font-medium tracking-tight text-foreground md:text-3xl">
              Have a project in mind, or just want to say hello?
            </h2>
            <a
              href={`mailto:${profile.email}`}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-opacity hover:opacity-80"
            >
              Start a conversation
              <ArrowUpRight className="size-4" />
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="text-sm text-foreground transition-colors hover:text-primary"
            >
              {profile.email}
            </a>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {profile.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </span>
          <span>Based in {profile.location}</span>
        </div>
      </div>
    </footer>
  )
}
