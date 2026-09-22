# MyWeek AI

**Turn your calendar into an action plan.**
Know what matters, why it matters, what changed, and what may need your attention.

MyWeek AI is a hackathon prototype (AI + Elections) — an **internal
operational-awareness tool** for election-office outreach employees. It is
**not** a voter-facing application and does **not** interact with voting
equipment, ballots, tabulation systems, voter-registration databases, election
results, or any election infrastructure.

MyWeek is an **intelligence layer** that sits read-only on top of existing
operational systems (conceptually Microsoft Outlook + Airtable) and turns
fragmented operational information into a personalized briefing.

> This prototype uses **realistic synthetic data only**. There are no real
> Outlook, Microsoft Graph, Airtable, or election-system integrations, and the
> app runs fully offline with **no API keys required**.

---

## Core principle: AI interprets. Humans decide.

| Layer | Responsibility |
| --- | --- |
| **Deterministic change engine** | Compares previous vs. current snapshots (e.g. `25 → 40` attendees). No AI. |
| **AI interpretation (mock)** | Explains whether a detected change *may* matter to *this* employee, grounded in source facts. |
| **Human** | Makes the decision. MyWeek is advisory and read-only. |

MyWeek **may** summarize, explain, interpret, rank, answer questions, and point
to sources. MyWeek **must not** modify Outlook/Airtable, create/cancel events,
reassign people, expand permissions, hide authoritative records, or present AI
guesses as official instructions.

---

## Screens

- **My Actions** (home) — the hero briefing. Summary row (1 Action Required · 2
  Changes · 5 Relevant This Week · 12 Other Events Available), the ASU MCTEC
  Tour hero card (`25 → 40` attendees), and a ranked-but-never-hidden event list.
- **Event Intelligence / Review Change** — *What changed* (deterministic),
  *Why this may matter* (AI interpretation with per-fact sources), *Documented
  information* (source facts), *MyWeek Suggestion* (clearly-labeled advisory),
  plus a **source drawer** showing raw synthetic Outlook/Airtable records incl.
  historical snapshots.
- **Ask MyWeek** — conversational Q&A driven by deterministic mock logic. Try
  the suggested questions; answers are grounded and cite sources.
- **Team** — shared operational context, grouped by location, with one
  carefully-labeled coverage alert.
- **All Events** — the full authorized list (rank, never hide).
- **About / Trust** → **How MyWeek Handles Uncertainty** — three safety
  demonstrations: missing role, source conflict, and prompt-injection.

---

## Tech stack

React 18 · TypeScript · Vite · Tailwind CSS · React Router.

```
src/
  data/         # types + synthetic events, team, snapshots
  services/     # changeEngine (deterministic) · aiService (mock) · dataStore · feedbackStore
  components/   # AppShell, Sidebar, Header, cards, badges, drawer, feedback, icons
  pages/        # MyActions, EventDetail, AskMyWeek, TeamView, AllEvents, AboutTrust, Uncertainty
  utils/        # date helpers
```

Clear separation of concerns: **source data → deterministic change detection →
AI interpretation (mock) → UI**.

### Where a real LLM plugs in

`src/services/aiService.ts` is the *only* module that produces AI
*interpretation*. Its functions (`interpretChange`, `answerQuestion`,
`explainRelevance`, `handleUntrustedContent`) return realistic predefined
responses today, and are `async`-friendly so an approved LLM can be dropped in
later without changing the UI. A safety-focused system prompt
(`SAFETY_SYSTEM_PROMPT`) documents the guardrails any real implementation must
preserve. **No external provider (OpenAI/Anthropic/AWS/etc.) is required.**

---

## Run locally

```bash
npm install
npm run dev        # start the dev server (Vite provides SPA routing)
# or
npm run build && npm run preview
```

Then open the printed local URL. The default screen is **My Actions**.

## Demo flow

1. Open **My Actions** → note the ASU MCTEC Tour, attendance `25 → 40`.
   (Ordinary software detected the change deterministically.)
2. Click **Review change** → see *Sarah = Tour Lead* and *visitor materials*
   from source records, then the **AI interpretation** and **MyWeek Suggestion**
   with source grounding. Open **View source information** for raw records.
3. Open **Ask MyWeek** → ask *"What changed since yesterday?"* → grounded answer.
4. Open **About / Trust → How MyWeek Handles Uncertainty** → *Role not
   specified*, *Source conflict (Room 101 / Room 202)*, *Prompt injection —
   permissions unchanged*, and *Rank, never hide.*

---

*Synthetic demo data. Logged-in demo user: Sarah Martinez, Outreach
Coordinator. All names and events are fictional.*
