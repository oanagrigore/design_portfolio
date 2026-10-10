// "How I work" — rendered inside the About page section, which supplies the
// outer spacing, the max-width container and the "01 How I work" label.
// Layout: heading on the left (sticky on desktop), numbered principles on the
// right, separated by thin lines instead of cards.

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

export function FiveReasons() {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-12">
      <div className="md:sticky md:top-28 md:col-span-5 md:self-start">
        <h2 className="text-balance text-3xl font-medium leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          A few reasons you shouldn&apos;t hire me.
        </h2>
        <p className="mt-5 max-w-[38ch] text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          Unless you want a product design lead who prioritizes clear problem definition, design governance, and accessibility over shortcut execution.
        </p>
      </div>

      <ol className="md:col-span-6 md:col-start-7">
        {reasons.map((item) => (
          <li
            key={item.num}
            className="grid grid-cols-[48px_1fr] gap-y-2 border-t border-border/60 py-7 last:border-b md:grid-cols-[56px_1fr] md:py-8"
          >
            <span
              aria-hidden="true"
              className="pt-1 text-xs font-medium tabular-nums text-pink-400"
            >
              {item.num}
            </span>
            <h3 className="text-lg font-medium leading-snug tracking-tight text-foreground md:text-xl">
              {item.title}
            </h3>
            <p className="col-start-2 text-pretty leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </li>
        ))}
      </ol>
    </div>
  )
}
