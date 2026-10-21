'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { profile } from '@/lib/content'

const LINKS = [
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/contact', label: 'Contact' },
]

/**
 * The site's only navigation: a floating pill fixed at the bottom centre of the screen.
 * Your name sits at the start of the pill and links home (it replaces both the top
 * header and a "Home" link). On phones it shortens to your first name so everything fits.
 * On the homepage it stays hidden over the reading room and slides in once you scroll past it.
 */
export function FooterNav() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [pastHero, setPastHero] = useState(!isHome)

  useEffect(() => {
    if (!isHome) {
      setPastHero(true)
      return
    }
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  const firstName = profile.name.split(' ')[0]
  const item =
    'inline-flex min-h-10 items-center whitespace-nowrap rounded-full px-2 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 min-[400px]:px-2.5 sm:min-h-11 sm:px-4 sm:text-sm'

  return (
    <nav
      aria-label="Site"
      // inert while hidden, so keyboard users can't tab into links they can't see
      inert={!pastHero}
      className={`pointer-events-none fixed inset-x-0 z-40 flex justify-center px-3 transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
        pastHero ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
      style={{ bottom: 'max(16px, calc(env(safe-area-inset-bottom) + 8px))' }}
    >
      <ul className="pointer-events-auto flex items-center rounded-full bg-[rgba(14,12,20,0.72)] p-1 shadow-[0_8px_30px_rgba(0,0,0,0.45)] ring-1 ring-white/10 backdrop-blur-md">
        <li>
          <Link
            href="/"
            aria-current={isHome ? 'page' : undefined}
            className={`${item} text-white hover:text-pink-200 sm:pl-5`}
          >
            <span className="sm:hidden">{firstName}</span>
            <span className="hidden sm:inline">{profile.name}</span>
            <span className="sr-only">, home</span>
          </Link>
        </li>
        <li aria-hidden="true" className="mx-0.5 h-5 w-px bg-white/15 sm:mx-1.5" />
        {LINKS.map((l) => {
          const current = pathname.startsWith(l.href)
          return (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={current ? 'page' : undefined}
                className={`${item} ${current ? 'bg-white/10 text-white' : 'text-white/65 hover:bg-white/5 hover:text-white'}`}
              >
                {l.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
