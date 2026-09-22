import { Routes, Route } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { MyActions } from './pages/MyActions'
import { EventDetail } from './pages/EventDetail'
import { AskMyWeek } from './pages/AskMyWeek'
import { TeamView } from './pages/TeamView'
import { AllEvents } from './pages/AllEvents'
import { AboutTrust } from './pages/AboutTrust'
import { Uncertainty } from './pages/Uncertainty'
import { NotFound } from './pages/NotFound'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <AppShell>
        <Routes>
          <Route path="/" element={<MyActions />} />
          <Route path="/events" element={<AllEvents />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/ask" element={<AskMyWeek />} />
          <Route path="/team" element={<TeamView />} />
          <Route path="/trust" element={<AboutTrust />} />
          <Route path="/trust/uncertainty" element={<Uncertainty />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppShell>
    </>
  )
}
