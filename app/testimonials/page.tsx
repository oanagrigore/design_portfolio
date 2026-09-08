import type { Metadata } from 'next'
import { TestimonialsList } from '@/components/testimonials-list'
import { testimonials } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Testimonials — Oana Grigore',
  description: 'Kind words from people I have worked with.',
}

export default function TestimonialsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <section className="pt-24 pb-12 md:pt-32 md:pb-16">
        <p className="text-sm text-muted-foreground">Testimonials</p>
        <h1 className="mt-6 max-w-3xl text-balance text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl">
          Kind words from people I&apos;ve had the pleasure of working with.
        </h1>
      </section>

      <section className="pb-16 md:pb-24">
        <TestimonialsList testimonials={testimonials} />
      </section>
    </div>
  )
}
