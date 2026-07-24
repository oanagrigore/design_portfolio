import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { CaseStudy } from '@/lib/content'

function chunk<T>(items: T[], size: number): T[][] {
  const rows: T[][] = []
  for (let i = 0; i < items.length; i += size) {
    rows.push(items.slice(i, i + size))
  }
  return rows
}

function ShelfCover({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className="group relative z-10 flex flex-col items-center hover:z-30"
      aria-label={`${study.title} — ${study.client}`}
    >
      {/* contact shadow on the shelf */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 z-0 h-4 w-[82%] rounded-[50%] bg-black/60 blur-md transition-all duration-500 group-hover:w-[95%] group-hover:opacity-70 group-hover:blur-lg"
      />
      <span className="relative z-10 aspect-[4/3] w-64 max-w-full origin-bottom overflow-hidden rounded-md border border-border/60 shadow-[0_22px_45px_-14px_rgba(0,0,0,0.75)] transition-all duration-500 ease-out group-hover:-translate-y-3 group-hover:scale-[1.1] group-hover:border-border group-hover:shadow-[0_40px_70px_-18px_rgba(0,0,0,0.85)] sm:w-52 sm:group-hover:scale-[1.28] md:w-60 lg:w-64">
        <Image
          src={study.cover || '/placeholder.svg'}
          alt={`${study.title} case study cover`}
          fill
          sizes="(max-width: 640px) 40vw, (max-width: 1024px) 30vw, 260px"
          className="object-cover object-center"
        />
        {/* hover overlay + Open button */}
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center bg-background/40 opacity-0 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-100"
        >
          <span className="flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-[10px] font-medium tracking-wide text-primary-foreground shadow-lg sm:text-xs">
            Open
            <ArrowUpRight className="size-3 sm:size-3.5" />
          </span>
        </span>
      </span>
    </Link>
  )
}

function Shelf({ studies }: { studies: CaseStudy[] }) {
  return (
    <div className="relative">
      <div className="flex flex-col items-center gap-10 sm:flex-row sm:items-end sm:justify-center sm:gap-10 md:gap-14">
        {studies.map((study) => (
          <ShelfCover key={study.slug} study={study} />
        ))}
      </div>
      {/* shelf plank: bright front edge + shadow lip */}
      <div className="relative">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-foreground/30 to-transparent" />
        <div className="h-8 w-full bg-gradient-to-b from-foreground/[0.05] to-transparent" />
      </div>
    </div>
  )
}

export function WorkGallery({ studies }: { studies: CaseStudy[] }) {
  const shelves = chunk(studies, 3)

  return (
    <div>
      <div className="flex flex-col gap-16 md:gap-20">
        {shelves.map((row, i) => (
          <Shelf key={i} studies={row} />
        ))}
      </div>

      {/* Index */}
      <ul className="mt-20 border-t border-border/60 md:mt-28">
        {studies.map((study) => (
          <li key={study.slug}>
            <Link
              href={`/work/${study.slug}`}
              className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 border-b border-border/60 py-4 sm:gap-8"
            >
              <span className="text-sm tabular-nums text-muted-foreground">
                {study.year}
              </span>
              <span className="flex items-start gap-1 text-pretty font-medium leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
                {study.title}
                <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
              </span>
              <span className="hidden text-sm text-muted-foreground sm:block">
                {study.client}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
