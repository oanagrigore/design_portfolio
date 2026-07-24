import type { Metadata } from 'next'
import { WorkGallery } from '@/components/work-gallery'
import { caseStudies } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Work — Oana Grigore',
  description: 'Selected case studies and product design work by Oana Grigore.',
}

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <section className="pt-24 pb-4 md:pt-32">
        <p className="text-sm text-muted-foreground">Work</p>
        <h1 className="mt-6 max-w-2xl text-balance text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl">
          Selected projects.
          <br />
          Each with the thinking behind it.
        </h1>
      </section>

      <section className="py-16 md:py-24">
        <WorkGallery studies={caseStudies} />
      </section>
    </div>
  )
}
