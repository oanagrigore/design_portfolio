'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

/**
 * Shows `children` on every page except /contact, where it shows `fallback` instead.
 * The contact page already has your email and links, so the footer there is just the legal line.
 */
export function FooterCta({ children, fallback = null }: { children: ReactNode; fallback?: ReactNode }) {
  return usePathname() === '/contact' ? <>{fallback}</> : <>{children}</>
}
