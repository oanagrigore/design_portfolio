import Link from 'next/link'
import Image from 'next/image'
import { Sparkles, ArrowUpRight } from 'lucide-react'
import { caseStudies } from '@/lib/content'

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      {/* Header */}
      <header className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
          Selected projects.
        </h1>
        <p className="mt-2 text-lg font-normal text-muted-foreground sm:text-xl">
          Each with the thinking behind it.
        </p>
      </header>

      {/* Grid Layout matching your second screen */}
      <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-2">
        {caseStudies.map((study) => (
          <article
            key={study.slug}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card/60 p-5 transition-all duration-300 hover:border-pink-500/40 hover:shadow-2xl"
          >
            <Link href={`/work/${study.slug}`} className="flex flex-col h-full">
              {/* Project Cover Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border/60 bg-muted">
                <Image
                  src={study.cover || '/placeholder.svg'}
                  alt={study.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>

              {/* Title & Tags */}
              <div className="mt-5 space-y-2">
                <div className="flex flex-wrap gap-1.5">
                  {study.tags?.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border/80 bg-muted/40 px-2.5 py-0.5 text-[14px] font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-start justify-between gap-3 pt-1">
                  <h2 className="text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-pink-400">
                    {study.title}
                  </h2>
                  <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-pink-400" />
                </div>
              </div>

              {/* Exact Impact Callout Box from Image 1 */}
              {study.impactText && (
                <div className="mt-6">
                  <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-pink-400">
                    <span>Core Business & Design Impact</span>
                  </div>
                  <p className="mt-2 text-xs md:text-sm font-medium leading-relaxed text-foreground/90">
                    {study.impactText}
                  </p>
                </div>
              )}
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}