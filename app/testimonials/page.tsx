import type { Metadata } from 'next'
import { Quote } from 'lucide-react'
import { testimonials } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Testimonials | Oana Grigore',
  description: 'Kind words from people I have worked with.',
}

export default function TestimonialsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <section className="pt-24 pb-16 md:pt-32 md:pb-20">
        <p className="text-sm text-muted-foreground">Testimonials</p>
        <h1 className="mt-6 max-w-3xl text-balance text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl">
          Kind words from people I&apos;ve had the pleasure of working with.
        </h1>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="gap-6 md:columns-2 [&>*]:mb-6">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex break-inside-avoid flex-col gap-6 rounded-lg border border-border/60 bg-card p-8 md:p-10"
            >
              <div className="flex flex-col gap-4">
                <Quote
                  aria-hidden="true"
                  className="size-6 shrink-0 text-primary"
                />
                {t.headline && (
                  <p className="text-pretty text-lg font-semibold leading-snug tracking-tight text-foreground">
                    {t.headline}
                  </p>
                )}
                <blockquote className="text-pretty text-base leading-relaxed text-muted-foreground">
                  {t.quote}
                </blockquote>
              </div>
              <figcaption className="mt-auto border-t border-border/60 pt-5">
                <p className="text-base font-medium text-foreground">
                  {t.name}
                </p>
                <p className="text-sm text-muted-foreground">{t.title}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  )
}
