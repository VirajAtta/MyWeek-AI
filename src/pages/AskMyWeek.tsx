import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  answerQuestion,
  SUGGESTED_QUESTIONS,
  type AskAnswer,
} from '../services/aiService'
import { AIInterpretationKicker } from '../components/Labels'
import { IconSpark, IconArrowRight, IconDoc } from '../components/icons'

/**
 * SCREEN 4 — ASK MYWEEK.
 *
 * A clean conversational interface. Answers are produced by the deterministic
 * mock aiService (no external API key required). The interpretation lines are
 * visually distinguished from source-grounded facts.
 */

interface Turn {
  id: number
  question: string
  answer?: AskAnswer
  loading: boolean
}

export function AskMyWeek() {
  const [turns, setTurns] = useState<Turn[]>([])
  const [input, setInput] = useState('')
  const nextId = useRef(1)
  const scrollRef = useRef<HTMLDivElement>(null)

  function ask(question: string) {
    const q = question.trim()
    if (!q) return
    const id = nextId.current++
    setTurns((prev) => [...prev, { id, question: q, loading: true }])
    setInput('')

    const answer = answerQuestion(q)
    // Simulate assistant latency so the demo feels real.
    window.setTimeout(() => {
      setTurns((prev) =>
        prev.map((t) => (t.id === id ? { ...t, answer, loading: false } : t)),
      )
      requestAnimationFrame(() =>
        scrollRef.current?.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: 'smooth',
        }),
      )
    }, answer.latencyMs)
  }

  return (
    <div className="space-y-6">
      <header>
        <h2 className="flex items-center gap-2 text-xl font-bold text-ink">
          <IconSpark className="h-5 w-5 text-brand-600" aria-hidden />
          Ask MyWeek
        </h2>
        <p className="mt-1 text-sm text-ink-muted">
          Ask questions about the event information you're authorized to access.
        </p>
      </header>

      {/* Conversation */}
      <div ref={scrollRef} className="space-y-5">
        {turns.length === 0 && (
          <div className="card p-6 text-center">
            <p className="text-sm text-ink-muted">
              MyWeek answers using only your authorized, source-grounded event
              information. Try one of the suggested questions below.
            </p>
          </div>
        )}

        {turns.map((turn) => (
          <div key={turn.id} className="space-y-3">
            {/* User bubble */}
            <div className="flex justify-end">
              <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-brand-600 px-4 py-2.5 text-sm font-medium text-white">
                {turn.question}
              </div>
            </div>

            {/* Assistant */}
            <div className="flex items-start gap-3">
              <span
                className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700"
                aria-hidden
              >
                <IconSpark className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                {turn.loading ? (
                  <TypingIndicator />
                ) : (
                  turn.answer && <AnswerBlock answer={turn.answer} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Suggested questions */}
      <section aria-label="Suggested questions">
        <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
          Suggested questions
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {SUGGESTED_QUESTIONS.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => ask(q)}
              className="chip border border-slate-300 bg-white text-ink-muted hover:bg-slate-50"
            >
              {q}
            </button>
          ))}
        </div>
      </section>

      {/* Composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          ask(input)
        }}
        className="sticky bottom-4 flex items-center gap-2 rounded-2xl border border-slate-300 bg-white p-2 shadow-card"
      >
        <label htmlFor="ask-input" className="sr-only">
          Ask MyWeek a question
        </label>
        <input
          id="ask-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your events…"
          className="flex-1 bg-transparent px-3 py-2 text-sm text-ink placeholder:text-ink-soft focus:outline-none"
          autoComplete="off"
        />
        <button type="submit" className="btn-primary" disabled={!input.trim()}>
          Ask
          <IconArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </form>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="inline-flex items-center gap-1 rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-card border border-slate-200">
      <span className="sr-only">MyWeek is thinking…</span>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-2 w-2 animate-bounce rounded-full bg-ink-soft"
          style={{ animationDelay: `${i * 120}ms` }}
        />
      ))}
    </div>
  )
}

function AnswerBlock({ answer }: { answer: AskAnswer }) {
  const [showSources, setShowSources] = useState(false)
  return (
    <div className="rounded-2xl rounded-tl-sm border border-slate-200 bg-white p-4 shadow-card">
      {answer.headline && (
        <p className="mb-3 text-sm font-semibold text-ink">{answer.headline}</p>
      )}

      <div className="space-y-4">
        {answer.items.map((item, i) => (
          <div key={i} className={item.title ? '' : 'text-sm text-ink-muted'}>
            {item.title && (
              <div className="text-sm font-semibold text-ink">
                {item.eventId ? (
                  <Link
                    to={`/events/${item.eventId}`}
                    className="hover:underline"
                  >
                    {item.title}
                  </Link>
                ) : (
                  item.title
                )}
              </div>
            )}
            {item.lines.map((line, j) => (
              <p key={j} className="mt-1 text-sm text-ink">
                {line}
              </p>
            ))}
            {item.interpretation && (
              <div className="mt-2 rounded-lg bg-brand-50 px-3 py-2">
                <AIInterpretationKicker />
                <p className="mt-1.5 text-sm text-ink">{item.interpretation}</p>
              </div>
            )}
            {item.source && showSources && (
              <p className="mt-1.5 text-xs text-ink-soft">
                Source: {item.source}
              </p>
            )}
          </div>
        ))}
      </div>

      {answer.showSources && (
        <button
          type="button"
          onClick={() => setShowSources((s) => !s)}
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700"
          aria-expanded={showSources}
        >
          <IconDoc className="h-3.5 w-3.5" aria-hidden />
          {showSources ? 'Hide sources' : 'View sources'}
        </button>
      )}
    </div>
  )
}
