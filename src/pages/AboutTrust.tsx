import { Link } from 'react-router-dom'
import {
  IconShield,
  IconDoc,
  IconLock,
  IconSpark,
  IconArrowRight,
  IconCheck,
} from '../components/icons'
import {
  SourceFactKicker,
  AIInterpretationKicker,
  SuggestionKicker,
} from '../components/Labels'

/**
 * ABOUT / TRUST — concise statement of principles + the category legend
 * (Source Fact vs AI Interpretation vs MyWeek Suggestion) + entry to the
 * "How MyWeek Handles Uncertainty" safety demonstrations.
 */

const PRINCIPLES = [
  {
    title: 'AI interprets. Humans decide.',
    body: 'MyWeek summarizes, explains, and ranks. It never makes operational decisions for you.',
  },
  {
    title: 'Rank, never hide.',
    body: 'MyWeek prioritizes information to help employees focus, but it never removes authorized source information based on an AI relevance judgment.',
  },
  {
    title: 'Source-grounded.',
    body: 'Every fact points back to Outlook or Airtable. Interpretations are always tied to the facts behind them.',
  },
  {
    title: 'Existing permissions first.',
    body: 'MyWeek only works with information you are already authorized to access. It never expands permissions.',
  },
  {
    title: 'Read-only intelligence layer.',
    body: 'MyWeek does not autonomously modify authoritative operational records, create or cancel events, or reassign people.',
  },
]

export function AboutTrust() {
  return (
    <div className="space-y-8">
      <header>
        <h2 className="flex items-center gap-2 text-xl font-bold text-ink">
          <IconShield className="h-5 w-5 text-brand-600" aria-hidden />
          About / Trust
        </h2>
        <p className="mt-1 max-w-2xl text-sm text-ink-muted">
          MyWeek AI is a read-only intelligence layer over existing operational
          systems. This hackathon prototype uses synthetic data only.
        </p>
      </header>

      {/* Principles */}
      <section className="grid gap-3 sm:grid-cols-2">
        {PRINCIPLES.map((p) => (
          <div key={p.title} className="card p-5">
            <div className="flex items-start gap-2">
              <IconCheck
                className="mt-0.5 h-4 w-4 shrink-0 text-ok-fg"
                aria-hidden
              />
              <div>
                <h3 className="text-sm font-bold text-ink">{p.title}</h3>
                <p className="mt-1 text-sm text-ink-muted">{p.body}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Category legend */}
      <section className="card p-6">
        <h3 className="text-base font-bold text-ink">
          How to read MyWeek: three categories
        </h3>
        <p className="mt-1 text-sm text-ink-muted">
          The interface visually distinguishes these so you always know what is
          fact and what is interpretation.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 p-4">
            <SourceFactKicker />
            <p className="mt-2 text-sm font-semibold text-ink">Source Fact</p>
            <p className="mt-1 text-sm text-ink-muted">
              Directly retrieved from Outlook or Airtable.
            </p>
            <p className="mt-2 text-xs text-ink-soft">
              Example: “Role: Tour Lead”.
            </p>
          </div>
          <div className="rounded-xl border border-brand-100 bg-brand-50/40 p-4">
            <AIInterpretationKicker />
            <p className="mt-2 text-sm font-semibold text-ink">
              AI Interpretation
            </p>
            <p className="mt-1 text-sm text-ink-muted">
              Contextual reasoning grounded in source facts.
            </p>
            <p className="mt-2 text-xs text-ink-soft">
              Example: “The attendance increase may affect your preparation
              because you're the Tour Lead.”
            </p>
          </div>
          <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-4">
            <SuggestionKicker />
            <p className="mt-2 text-sm font-semibold text-ink">
              MyWeek Suggestion
            </p>
            <p className="mt-1 text-sm text-ink-muted">
              An optional AI-generated consideration.
            </p>
            <p className="mt-2 text-xs text-ink-soft">
              Always labeled: “AI-generated suggestion — not a supervisor
              instruction.”
            </p>
          </div>
        </div>
      </section>

      {/* What MyWeek does / doesn't */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="card p-6">
          <h3 className="flex items-center gap-2 text-sm font-bold text-ink">
            <IconSpark className="h-4 w-4 text-brand-600" aria-hidden />
            MyWeek may
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            {[
              'Summarize authorized information',
              'Explain context and interpret changes',
              'Rank information by likely relevance',
              'Answer questions about authorized information',
              'Point you toward source records',
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-ok-fg" aria-hidden />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-6">
          <h3 className="flex items-center gap-2 text-sm font-bold text-ink">
            <IconLock className="h-4 w-4 text-ink-muted" aria-hidden />
            MyWeek must not
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            {[
              'Modify Outlook or Airtable',
              'Create or cancel official events',
              'Assign employees or change responsibilities',
              'Expand user permissions or hide authoritative records',
              'Present AI guesses as official instructions or invent information',
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 text-ink-soft" aria-hidden>
                  ×
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Uncertainty entry */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-ink-muted"
              aria-hidden
            >
              <IconDoc className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-ink">
                How MyWeek Handles Uncertainty
              </h3>
              <p className="mt-1 text-sm text-ink-muted">
                See how MyWeek behaves with missing roles, conflicting sources,
                and untrusted content.
              </p>
            </div>
          </div>
          <Link to="/trust/uncertainty" className="btn-primary">
            View safety demonstrations
            <IconArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>
    </div>
  )
}
