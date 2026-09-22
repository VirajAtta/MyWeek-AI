# MyWeek AI

### Turn your calendar into an action plan.

**Know what matters, why it matters, what changed, and what may need your attention.**

**Live Prototype:** https://my-week-ai.vercel.app

MyWeek AI is an **internal operational-awareness tool for election-office outreach employees**, created for the AI + Elections Hackathon.

It transforms fragmented event information into a personalized, source-grounded briefing that helps employees understand:

* **What matters to me?**
* **Why does it matter?**
* **What changed?**
* **What may need my attention?**

MyWeek does not replace an employee's existing operational systems. It acts as a read-only intelligence layer over them.

> **Hackathon prototype:** MyWeek currently uses realistic synthetic data and a simulated AI service. There are no real Outlook, Microsoft Graph, Airtable, or election-system integrations, and no external AI API is required.

---

## The Problem

MyWeek was developed through a co-design process with **Sarah, an election-office employee**, during the AI + Elections Hackathon.

Sarah described a roughly 30-person team coordinating approximately **150 events and 50 tours per year**. Their operational information can be distributed across tools such as Microsoft Outlook and Airtable.

Outlook is central to Sarah's daily workflow, but a crowded calendar does not always make it immediately clear:

* Why am I involved in this event?
* What is my responsibility?
* What changed since I last looked?
* Does that change affect me?
* What information is relevant specifically to me?
* What may require my attention?
* What is relevant to the rest of my team?

We initially approached this as an **Outlook/Airtable synchronization problem**.

Our co-design process changed that understanding.

The deeper problem was **operational awareness**: the information exists, but employees still have to find, compare, and interpret it before understanding what matters to them.

---

## The Solution

MyWeek is an **intelligence layer** over existing operational information.

Conceptually:

```text
Outlook + Airtable
        ↓
Existing permissions
        ↓
Authorized data only
        ↓
Previous + current snapshots
        ↓
Deterministic change detection
        ↓
Employee + event context
        ↓
AI interpretation
        ↓
Personalized briefing
        ↓
Human decision
```

A traditional system can determine:

> Attendance changed from **25 → 40**.

MyWeek combines that detected change with documented context:

> Sarah is the **Tour Lead**.

and can produce an interpretation:

> Because Sarah is the Tour Lead, the attendance increase **may affect preparation for the tour**.

This distinction is central to MyWeek:

**Ordinary software detects what changed. AI interprets why that change may matter to a particular employee.**

---

## Core Principle: AI Interprets. Humans Decide.

| Layer                                          | Responsibility                                                                            |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **Deterministic change engine**                | Compares previous and current snapshots, such as `25 → 40` attendees. No AI required.     |
| **Context retrieval**                          | Retrieves documented roles, event notes, timing, and other authorized information.        |
| **AI interpretation — simulated in prototype** | Explains why a detected change may matter to this employee using source-grounded context. |
| **Human**                                      | Reviews the information and makes the operational decision.                               |

MyWeek may:

* Summarize authorized information
* Explain context
* Interpret changes
* Rank information by relevance
* Answer questions about authorized information
* Point users back to source records

MyWeek does **not** autonomously:

* Modify Outlook or Airtable
* Create or cancel events
* Reassign employees
* Change documented responsibilities
* Expand user permissions
* Hide authoritative records
* Present AI-generated suggestions as supervisor instructions

---

## Ethics-Driven Redesign

Our original concept allowed AI to **filter out events it considered irrelevant**.

During the hackathon's AI ethics review, we identified a serious failure mode:

> **What happens if the AI incorrectly decides that an important event is irrelevant?**

That feedback materially changed the product.

### Before

**AI determines relevance → low-relevance information can disappear**

### After

**AI ranks information → all authorized information remains accessible**

Our resulting principle is:

## Rank, never hide.

MyWeek determines **priority, not access**.

The ethics review also led us to distinguish three levels of information throughout the interface:

### Source Fact

Directly retrieved from an operational source.

> **Role: Tour Lead**
> Source: Outlook

### AI Interpretation

Contextual reasoning grounded in source facts.

> Because you're the Tour Lead, the attendance increase may affect preparation.

### MyWeek Suggestion

An optional AI-generated consideration.

> Consider reviewing preparation for the larger group.

MyWeek suggestions are explicitly labeled as **AI-generated and not supervisor instructions**.

---

## Responsible AI Design

### Source-grounded

Important factual claims link back to the source information supporting them.

### Rank, never hide

AI may prioritize information but does not remove authorized events because of a relevance judgment.

### Don't guess

If MyWeek cannot determine someone's role:

> **ROLE NOT SPECIFIED**

rather than inventing a responsibility.

### Surface conflicts

If Outlook and Airtable disagree:

> **SOURCE CONFLICT**

Both values remain visible rather than allowing AI to silently choose.

### Permissions before AI

Existing access controls determine what information reaches MyWeek. The AI does not decide what an employee is authorized to see.

### Untrusted content stays data

Text inside event descriptions is treated as event data, not as instructions capable of changing MyWeek's permissions or behavior.

### Read-only

Authoritative operational systems remain authoritative. MyWeek interprets information rather than autonomously modifying it.

---

## Security Boundary

MyWeek is designed for **internal administrative event and outreach coordination**.

It does **not** interact with:

* Voting equipment
* Ballots
* Ballot tabulation systems
* Voter-registration databases
* Election results
* Systems that determine election outcomes

This hackathon prototype uses **synthetic data only**.

Any production connection to o
