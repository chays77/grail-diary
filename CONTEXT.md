# The Grail Diary — Skill Package

> This file orients the AI agent operating the system. The README orients the human.
> If you are the agent: read this first, then `grail.config.md` for paths, then the
> specific skill file for the task at hand.

---

## What This Is

A reusable agent/skill that turns a folder of markdown files into one or more
**named, scoped commonplace books** — modeled on the commonplace-book practice of
Da Vinci, Darwin, and Twain (the literal image: Henry Jones Sr.'s diary in
*Indiana Jones and the Last Crusade* — one book, everything collected, flipped
through to find connections).

It exists to defend the one faculty AI use erodes fastest — the messy, inefficient
work of *thinking*. It automates the part that is **not** the thinking (capture,
render, presentation) and reserves the part that **is** the thinking (finding the
connections) for the human.

---

## §0 The Governing Constraint (read this before anything else)

> **The system surfaces. The human connects.** The agent captures raw material into
> the book and lays it out for review. It NEVER interprets meaning, NEVER proposes a
> connection, NEVER ranks beyond the setup priority, NEVER closes the loop. The day the
> agent starts connecting is the day the muscle starts drying up.

Every file in this package is checked against that line. Two rules enforce it:

### The Two Grail Rules (non-negotiable, all phases)

1. **No self-editing at capture.** Everything offered goes in (subject to the human
   yes/no). The inner critic is bypassed at write-time. Filtering happens later, at
   review — not at the door.
2. **No to-do lists in the notebook.** To-dos are ephemeral clutter that kill creative
   thinking. They route to the owner's task list (`grail.config.md` → `todo_target`) —
   never the diary.

### The Filter Line (the single load-bearing anti-atrophy mechanic)

When the agent surfaces a candidate it may say **only** two things: (a) the **verbatim
trigger**, quoted; and (b) **which named config criterion matched**. It may not say why
it matters, propose a connection, interpret, or rank beyond setup priority.

**A candidate that cannot name a config criterion CANNOT be surfaced.** That single
requirement holds the whole boundary — the agent has no channel to surface its own
opinion of significance. Canonical format lives in `grail-capture.md` §"The Filter Line."

---

## §1 The Object Model — what the system manages

The system manages **N scoped journals**. A journal is the first-class object.

```
A Journal =
  name/topic            ("My Book", "The Cabin Build", "Daybook")
  slug                  (kebab-case folder name)
  type                  (Project | Memory | Reflective | Gratitude | Reference)   ← v1 set, extensible
  capture criteria      (the per-journal filter, produced by the Phase 0 interview)
  a folder              (its own home — entries + config + candidates + rendered diary)
  a rendered diary      (the flippable HTML book, built by build-diary.js)
```

### Per-Journal Folder Layout (the contract every phase reads/writes)

```
[journal-root]/[journal-slug]/
├── journal.config.md     ← Phase 0 output. Identity + capture criteria. Authoritative.
├── entries/              ← Phase 1 output. One confirmed entry per file: YYYY-MM-DD-slug.md
├── _candidates.md        ← Phase 1 staging. Surfaced-but-unconfirmed. Drained at review.
├── _session.md           ← Session state: last ingest, open candidates, priors, threads.
├── sources/              ← Pasted ingest sources, saved so the drain pass's "context"
│                            command works after the chat scrolls away. (Created on demand.)
└── diary/                ← Rendered HTML diary (build-diary.js). Open via file://.
    ├── index.html
    └── assets/           ← optional cover photo + hand-drawn theme sketches
```

### The journal root is a parameter, not a constant

`[journal-root]` resolves from a **single config value** — see `grail.config.md` at this
package root. Default is `journals/`. Do NOT hardcode the root in any prompt.

### One system — no parallel free-form surface

The Grail Diary is the whole capture layer. There is no second surface. Two pieces make
that work:

- **The Daybook** — ONE always-on Grail journal (type: Reflective) with loose criteria
  ("anything the owner jots"). It catches un-scoped daily fast-capture — the "just jot
  this, don't file it" moment. Entries can later move into a focused journal
  (Entry Point D).
- **The Sticky-Notes holding pen** — old / un-migrated notes live in a VISIBLE, searchable
  "not yet filed" pile at `{sticky_notes_pen}` (NOT in any journal, NOT deleted).
  Entry Point D drains it into real journals over time.

---

## The Files in This Package

| File | Phase | Purpose |
|---|---|---|
| `README.md` | — | The human-facing guide: the method, the rules, setup, daily use. |
| `CONTEXT.md` | — | This file. Orients the agent: governing constraint, object model, when to invoke. |
| `grail.config.md` | — | The single resolvable config: `journal_root`, the Daybook slug, the sticky-notes pen path, the ingest cap, the to-do target. Read this for paths; never hardcode. |
| `grail-listener.md` | 0 | The **Grail Listener** interview agent. Single type-aware script. Excavates one journal's filter in the owner's words → writes `journal.config.md`. |
| `grail-capture.md` | 1 | The **capture logic**. 4 entry points (Direct / Proactive / Ingest / Migration-Surfacing), the Filter Line, render-ready entry shape, `_candidates.md` staging, Grail Rule 2 routing, Daybook + sticky-notes mechanics. |
| `grail-criteria-review.md` | 1.5 | The **criteria tuning pass**. Runs after ingest batches when the owner wants to sharpen the filter. Surfaces volume/drop/near-miss signal → refines criteria in the owner's words → updates `journal.config.md`. Owner-invoked only. |
| `journal.config.template.md` | 0 | The template the Phase 0 interview fills in. The shape Phase 1 reads on every capture. |
| `build-diary.js` | 2 | The renderer. Builds each journal's flippable HTML diary from its `entries/` + config. Pure Node, no dependencies. |
| `diary-template/index.html` | 2 | The diary template build-diary.js scaffolds from. Shuffle-on-open, pinnable scraps, optional sketches. |

---

## When To Invoke

| Trigger | File | Mode |
|---|---|---|
| The owner sets up a new journal ("set up a Grail journal for X") | `grail-listener.md` | Phase 0 interview |
| The owner re-excavates an existing journal's criteria from scratch | `grail-listener.md` | Phase 0 interview |
| The owner says "add this to [journal]" / "Grail this" / "just jot this" | `grail-capture.md` | Entry Point A (Direct) / Daybook |
| A live session is in "watch [journal]" mode and material clears the bar | `grail-capture.md` | Entry Point B (Proactive) |
| The owner asks to process a transcript or text against a journal | `grail-capture.md` | Entry Point C (Ingest) |
| The owner wants to walk old notes into a journal ("let's migrate", "drain the sticky notes") | `grail-capture.md` | Entry Point D (Migration Surfacing) |
| The owner wants to tune a journal's filter after ingest passes ("criteria feel off", "let's tune the filter") | `grail-criteria-review.md` | Criteria tuning pass |
| The owner asks to rebuild a diary | `build-diary.js` | `node build-diary.js <slug>` |
