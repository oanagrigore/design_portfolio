import Link from 'next/link'

export function FiveReasons() {
  const reasons = [
    {
      num: '01',
      title: "I won't start work without clear context, a defined target audience, or an explicit scope.",
      description: "If we can't define the problem or who we're solving it for, I won't touch Figma. I audit flows first so we never waste design or engineering cycles on the wrong solution.",
    },
    {
      num: '02',
      title: 'I ask questions, a lot of them.',
      description: "I might be relentless when something isn't clear, but I refuse to make blind assumptions. If I don't deeply understand the project, I can't deliver exceptional results.",
    },
    {
      num: '03',
      title: 'I build design systems. If your team operates on "it works like this, don\'t worry", I worry a lot.',
      description: 'Working like this, creates debt. I build tokenized, scalable component governance designed for seamless, production-ready developer handoff.',
    },
    {
      num: '04',
      title: 'WCAG compliance is the standard, not a debate to speed up a timeline.',
      description: "Accessibility isn't a late-stage polish pass or something to cut to hit an arbitrary deadline. I design for WCAG 2.1 AA from step one, because an inaccessible product fails the people who need it most.",
    },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/30 px-3.5 py-2 text-s font-medium text-pink-400">
          <span className="size-2 rounded-full bg-pink-500 animate-pulse" />
          Working Principles
        </div>

        <h2 className="mt-6 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-5xl leading-[1.08]">
          A few reasons you{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-600">
            shouldn't
          </span>{' '}
          hire me.
        </h2>

        <p className="mt-4 text-pretty text-lg text-muted-foreground font-normal">
          Unless you want a product design lead who prioritizes clear problem definition, design governance, and accessibility over shortcut execution.
        </p>

        <div className="mt-10 space-y-4">
          {reasons.map((item) => (
            <div
              key={item.num}
              className="group backdrop-blur-sm transition-all"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4">
                <span className="font-mono text-sm font-bold text-pink-500 shrink-0">
                  {item.num}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-foreground tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-base text-muted-foreground font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}