import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

/**
 * AppShell — clean enterprise dashboard layout: left sidebar + top header +
 * scrollable content region. Desktop-first, responsive down to mobile.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main
          id="main"
          className="mx-auto w-full max-w-6xl flex-1 px-5 py-6 lg:px-8 lg:py-8"
        >
          {children}
        </main>
      </div>
    </div>
  )
}
