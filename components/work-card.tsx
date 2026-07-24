import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { CaseStudy } from '@/lib/content'

export function WorkCard({ study }: { study: CaseStudy }) {
  return (
    <Link href={`/work/${study.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border/60 bg-card">
        <Image
          src={study.cover || '/placeholder.svg'}
          alt={`${study.title} case study cover`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-4">
        <h3 className="flex items-start gap-1 text-lg font-medium leading-snug tracking-tight text-balance text-foreground">
          {study.title}
          <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
        </h3>
        <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">
          {study.summary}
        </p>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {study.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  )
}
