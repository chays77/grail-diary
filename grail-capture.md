# The Grail Diary — Phase 1 Capture

> The capture discipline + render-ready entry shape. Reads paths/cap/types from
> `grail.config.md`; reads each journal's filter from its `journal.config.md`.

---

## On Journal Open — Read `_session.md` First

Before any capture work on a journal, read `{journal_root}{slug}/_session.md`:

1. Surface open candidate count: "*You have [N] candidates in [journal].*" (nudge, not a block; skip if 0)
2. Note the last ingest processed — so you know what's already been scanned and don't re-surface it.
3. Load any entries listed in `Priors` — these are entries the owner flagged as load-bearing for current work.
4. Surface any open threads — one line, no elaboration. The owner decides whether to address them.

If `_session.md` does not exist yet, create it with empty sections and today's date before
proceeding.

---

## §0 The Governing Constraint (enforced on every line below)

> **The system surfaces. The human connects.** The agent captures raw material and lays
> it out. It NEVER interprets meaning, NEVER proposes a connection, NEVER ranks beyond
> setup priority, NEVER closes the loop.

### The Two Grail Rules

1. **No self-editing at capture.** Everything offered goes in (subject to the human
   yes/no). The agent does not judge quality, improve the idea, or decide if it's "good
   enough."
2. **No to-do lists in the notebook.** To-dos route off-notebook (see "Grail Rule 2
   Routing" below). The diary holds the *thinking* that might generate a to-do — never
   the to-do itself.

---

## The Filter Line (the load-bearing anti-atrophy mechanic)

When the agent surfaces a capture candidate (Entry Points B, C, and D), it may say
**ONLY** two things:

1. **The verbatim trigger** — quoted exactly. The raw line the owner said, the raw line
   from the transcript, the raw scrap from the back-catalogue. No paraphrase, no cleanup
   beyond removing transcription artifacts.
2. **Which criterion matched** — the named criterion label from the target journal's
   `journal.config.md`.

It may **NOT**: say why it matters · propose or imply a connection ("this relates to your
earlier note on…") · interpret, summarize, or reframe the trigger · rank beyond the
**setup priority** already in the config · editorialize, praise, or add any commentary.

### Canonical Filter Line format (the entire surfacing unit — one block per candidate)

```
> "[verbatim trigger]"
— matched: [criterion-label]  ·  journal: [journal-name]  ·  source: [direct|proactive|ingest|migration]
```

The owner responds **keep / refine / drop**. Nothing else is in the block.

### The hard boundary (why this holds)

- **Allowed (applying a stated filter):** the agent matches raw material against criteria
  *the owner defined in Phase 0*. They did the thinking once, deliberately. The agent
  mechanically applies it.
- **Forbidden (deciding what matters):** inventing a new criterion, weighting relevance by
  the agent's own judgment, or surfacing on a "this feels significant" basis not traceable
  to a config criterion.

**A candidate that cannot name a config criterion CANNOT be surfaced.** That single
requirement is the enforcement — the agent has no channel to express its own opinion of
significance. The criterion label is also what lets the owner **audit criteria drift**
over time (which criteria fire, which surface noise).

---

## The Four Entry Points

| | Entry Point | Trigger | Human in loop | Staging |
|---|---|---|---|---|
| A | **Direct** | The owner says "add this to [journal]" / "Grail this" / "just jot this" | Yes (they initiated) | **Skips `_candidates.md`** — writes straight to `entries/` |
| B | **Proactive** | "Watch [journal]" mode on; material clears a criterion + the bar | Yes (present, answers live) | Conversational, one at a time; kept entries → `entries/` |
| C | **Ingest** | The owner asks to process a transcript or text against a journal | No (during processing) | **Digest-at-end** → batched to `_candidates.md`, drained later |
| D | **Migration Surfacing** | The owner walks old notes into a target journal | Yes (present, answers live) | One at a time against the archive; "move" → `entries/` |

---

## Entry Point A — Direct Capture

**Trigger:** "add this to *[journal]*" / "put this in the diary" / "Grail this" / "just jot
this, don't file it."

**Journal binding:**
- The owner names the journal → bind to it.
- They don't name one, and **more than one journal exists** → the agent **asks** which
  journal (it may *suggest* the most likely from the active session topic, but **never
  picks silently**).
- They say "just jot this / don't file it" → bind to the **Daybook** (`grail.config.md` →
  `daybook_slug`). This is the un-scoped catch-all; they don't have to decide.
- Only one journal exists → bind to it.

**Process:**
1. Take the content the owner offered (a line, a quote, a scrap, a link, a thought).
2. **Grail Rule 1** — no self-editing. It goes in as offered. No quality judgment.
3. **Grail Rule 2** — if the content is a to-do, do NOT write it to the journal; route it
   off-notebook (see below).
4. Write a confirmed entry directly to `{journal_root}{slug}/entries/YYYY-MM-DD-slug.md`
   in the entry shape (below) with `source: direct`.
5. Confirm in one line: "In the *[journal]* diary." No commentary on the content.

Direct capture is **confirmed by definition** (the owner asked) → it skips
`_candidates.md`.

---

## Entry Point B — Proactive Capture (live session)

**Trigger:** the session is in **"watch [journal]"** mode (session toggle, OFF by
default — the owner opts in: "watch the book journal this session") AND material clears a
named criterion + the bar.

**Journal binding:** proactive fires **only against a journal active in the session**
(the one the owner named when they toggled watch-mode). The agent does NOT scan against
all N journals' criteria speculatively — that would be the agent deciding what matters
across the owner's whole life. Active-journal scope is the guardrail.

**The bar:** the criteria + `The Bar` in the active journal's config. Surface only material
that matches a named criterion AND clears the bar. Recommend-everything is signal death.

**Process (conversational, one at a time — NOT batched):**
1. Material clears a criterion + the bar.
2. Surface it using the **canonical Filter Line** — verbatim trigger + matched criterion.
   Nothing more.
3. The owner responds:
   - **keep** → write a confirmed entry to `entries/` with `source: proactive`.
   - **refine** → the owner edits the trigger/wording; write the refined version.
   - **drop** → discard. **No "passed" log** (a rejection log is itself mild atrophy-risk —
     it would let the agent's rejected guesses accumulate as a shadow opinion).

Proactive stays conversational because the human is present to answer in the moment. (This
is the key difference from Ingest, which batches because no human is in the loop during
processing.)

---

## Entry Point C — Ingest Capture (digest-at-end, staged)

**Trigger:** the owner asks to process a transcript or long text (a meeting, a podcast, a
call, an article, a book excerpt) **against a named journal**: "ingest this transcript for
[journal]" / "run this against the book journal." The owner names the journal when they
queue the source; the agent may suggest one, never silently picks.

**This is the highest atrophy-risk path.** It is safe ONLY because the owner defined the
filter up front — the agent applies it, never invents it.

**Process (DIGEST-AT-END):**
1. If another skill or workflow is also processing this source (a meeting-notes pass, a
   summary), let it run as normal. The Grail pass is **additive** — it never alters
   another deliverable.
2. Read the tagged journal's `journal.config.md` criteria.
3. **Read the full source first.** The agent reads the ENTIRE transcript or text before
   surfacing a single candidate. No early stopping, no surfacing in order of appearance.
4. **Collect all matches across the full text**, then rank by how cleanly each one hits a
   named criterion. Priority order: high-priority criteria first, then clearest signal
   within each criterion tier. The goal is the best candidates from the whole text, not
   the first candidates found.
5. Surface up to `ingest_candidate_cap` (from `grail.config.md`) of the highest-ranked
   matches as a batched candidate list in `{journal_root}{slug}/_candidates.md` — every
   candidate as a Filter Line block (`source: ingest`, originating source recorded in
   the section header).
6. **Nothing is auto-promoted.** The list waits in `_candidates.md` until the owner runs a
   single **keep/refine/drop pass** (below). Nothing is lost on session close — it
   persists in the file.

**Volume cap:** if the full-text scan finds more matches than `ingest_candidate_cap`,
surface only the strongest [cap] AND flag at the top of the batch:

> *"[N] total matches found across full text — showing strongest [cap]. Criteria may be
> surfacing broadly; worth a criteria review."*

The cap **NEVER silently truncates without flagging** — the count of total matches found
is always reported. Ties back to criteria-drift auditability.

---

## Entry Point D — Migration Surfacing (the back-catalogue walk)

**Trigger:** the owner wants to walk their existing notes into a target journal —
"surface the old notes against the book," "drain the sticky notes into [journal],"
"let's migrate."

**What it does:** a guided script that walks the existing back-catalogue ONE NOTE AT A TIME
against a TARGET journal's criteria, using the Filter Line pointed at the owner's own
archive instead of a transcript. The owner says **move** or **skip**. Still
human-in-the-loop. Still **NO auto-retrofit** — the agent never bulk-moves and never
decides for them.

**Sources walked (read-only) — from `grail.config.md` → `backcatalogue_sources` + the
sticky-notes pen:**
- every path listed in `backcatalogue_sources` (the owner's pre-Grail note folders)
- `{sticky_notes_pen}` (the "not yet filed" holding pen — Entry Point D is what drains it)
- the Daybook's `entries/` (un-scoped jots flowing into focused journals)

**Process (one at a time):**
1. The owner names the **target journal**. The agent loads that journal's
   `journal.config.md` criteria.
2. The agent walks the source notes in order. For each note that **matches a named
   criterion** of the target journal, it surfaces it with the canonical **Filter Line**
   (`source: migration`, origin = the source file path). It does NOT surface notes that
   match no criterion — same hard boundary as everywhere else.
3. The owner responds **move / skip** (the keep/refine/drop verbs collapse to move/skip
   here):
   - **move** → run the **"move" mechanics** (below) to convert the note into an entry in
     the target journal's `entries/`. If the source note lived in the sticky-notes pen, it
     is **removed from the pen** (it now lives in a real journal). If it lived in a
     `backcatalogue_sources` folder, those are **not deleted** — the migrated copy is the
     journal's; the original archive stays intact (no rewriting history).
   - **skip** → leave the note where it is. **No "skipped" log** (rejection log = mild
     atrophy-risk). A skipped note stays surfaceable on a future walk.
4. The owner can stop the walk at any time (`Done` / "that's enough"). Progress is
   implicit — what moved is in `entries/`; what didn't is still in the source.

### The "move" mechanics

When the owner says **move**, convert the source note to the entry shape:
- Structured prose from a legacy format → **collapsed into the single unstructured body**.
  Any "what it means" prose is preserved as body text — it was already the owner's, so it
  isn't lost; future entries simply won't have the sub-heading.
- Any action item / to-do in the source, if present → **extracted and offered for
  off-notebook routing** (Grail Rule 2 Routing, below). Never carried into the migrated
  entry.
- Add `journal:` (target slug) and `source: migration`; set `matched_criterion` to the
  criterion that surfaced it; set `origin` to the source file path.
- **Show the converted entry to the owner before writing it**, so any collapse of legacy
  structure is confirmed, not silent.

### Relationship to the Daybook

The Daybook accumulates un-scoped jots (Entry Point A "just jot this"). Entry Point D is
how those later flow into focused journals: walk the Daybook's `entries/` as a source
against a target journal's criteria, move what fits. The Daybook is a real journal (so its
entries are already entry-shaped — the "move" mechanics simply rewrite `journal:` and add
`matched_criterion`; no prose collapse needed). The sticky-notes pen, by contrast, holds
loose pre-Grail material that needs full conversion.

---

## The Sticky-Notes Holding Pen

**Where it lives:** `{sticky_notes_pen}`. NOT a journal (no `journal.config.md`, no
criteria, no rendered diary). NOT deleted. A **visible, searchable "not yet filed" pile.**

**What it holds:** old / un-migrated notes that don't yet belong to a focused journal — the
residue of "I jotted this somewhere and never filed it." It is the staging ground Entry
Point D drains over time.

**Shape:** one file per sticky, `YYYY-MM-DD-slug.md`, with minimal frontmatter
(`captured: YYYY-MM-DD`, `origin: [where it came from]`) and a raw body. No criteria, no
matched-criterion field — by definition these haven't been matched to a journal yet.

**How it's surfaced:** at the start of a session that touches the Grail system, the agent
gives a one-line nudge if the pen is non-empty: "*You have [N] notes in the sticky-notes
pen — want to drain any into a journal?*" (a nudge, not a block). The owner can also
search it directly like any folder.

**Drained by:** Entry Point D only. Nothing auto-files out of the pen.

---

## The Render-Ready Entry Shape (thin frontmatter + single unstructured body)

One confirmed entry = one file in `{journal_root}{slug}/entries/YYYY-MM-DD-slug.md`:

```markdown
---
journal: [journal-slug]                # REQUIRED
source: direct | proactive | ingest | migration   # REQUIRED
date: YYYY-MM-DD
slug: [kebab-case]
matched_criterion: [criterion-label]   # present for proactive/ingest/migration; null for direct
origin: [transcript filename | source file path | "live-session"]   # provenance
sketch: none | requested | [asset-filename]   # render hook (optional sketches)
---

[Single unstructured body. The captured material, in the owner's words or the verbatim
source quote. No imposed structure. No "what it means" — meaning is found at review,
by the owner, not written in at capture. This is the Grail rule made literal.]
```

**Why thin + unstructured:** the moment the format has a "what it means" field, the agent
(or the owner under format-pressure) starts pre-digesting — which is the thinking the
system exists to protect. The body is raw. Connection happens at review, across entries,
by the human.

**Required-field enforcement:** `journal:` and `source:` are mandatory. An entry missing
either is invalid and must NOT be written. `date` and `slug` are auto-generated.
`matched_criterion`, `origin`, `sketch` are populated where applicable (`matched_criterion`
is `null` for Direct capture, which had no criterion match — the owner just asked).

---

## Recurring Ideas — Multi-Citation and Theme Entries

When a surfaced candidate restates an idea **already captured** in an existing entry, do
NOT write a near-duplicate entry. The journal stays dense and connected, not repetitive.
Two moves resolve a recurrence — and the agent never decides which; it **flags the
suspected duplicate inline during the keep/refine/drop pass** and the owner chooses
**new-entry / add-citation / theme**:

1. **Multi-citation** — the same line or idea recurs across sources. Stack the new
   **verbatim quote + speaker attribution** in the body *under* the existing entry's
   quote(s), and add the new source to that entry's `origin` field (comma-separated list).
   No new file. Example `origin: episode-a.txt, episode-b.txt`.

2. **Theme entry** — several *distinct* quotes orbit one named idea. Create one entry whose
   body opens with `THEME: <idea>` (one line naming the through-line, no interpretation
   beyond the name), followed by each quote with its own verbatim text + speaker citation.
   `origin` lists every source. `matched_criterion` = the criterion the theme sits under.

**Duplicate-flagging is the agent's job, the decision is the owner's.** Before surfacing /
while draining, the agent scans existing `entries/` for concept overlap (the recurring
metaphors, named principles, repeated claims) and notes any suspected match in the Filter
Line block or the drain prompt — e.g. *"🔁 possible duplicate of `<slug>` — same idea,
different words."* It still never interprets meaning; it only points at a prior entry by
slug. The owner decides whether the recurrence is a new entry, a stacked citation, or a
theme.

This preserves the Grail boundary: the agent surfaces raw material and points at structure;
the human connects and decides how the journal holds the recurrence.

**Speaker citation:** every confirmed entry carries the speaker's name + source (e.g.
`— Name (org), Source`) so the quote is always attributable. On multi-citation and theme
entries, each stacked quote carries its own speaker line.

---

## `_candidates.md` Staging (per-journal)

Holds surfaced-but-unconfirmed entries from Ingest (§Entry Point C) and, optionally,
deferred live candidates the owner didn't resolve in the moment.

```markdown
# [Journal Name] — Candidates (unconfirmed)

> Surfaced by the Grail pass against this journal's criteria. Not yet in the diary.
> Run keep/refine/drop to drain. Dropped candidates are deleted, not archived.

## From ingest: [source filename] · [date]
<!-- If count > cap, the overflow flag line goes here, above the blocks. -->

> "[verbatim trigger]"
— matched: [criterion-label]  ·  journal: [journal-name]  ·  source: ingest

> "[verbatim trigger]"
— matched: [criterion-label]  ·  journal: [journal-name]  ·  source: ingest
...
```

**The keep/refine/drop pass — one at a time (drains the file):**

Present candidates **one at a time**, not as a dump. Each candidate gets its own block:

```
---
Candidate [N] of [M] · matched: [criterion-label]

> "[verbatim trigger]"

keep / refine / drop / context
```

Wait for a response before presenting the next candidate. Valid responses:

- **keep** → promote: write a confirmed entry to `entries/` (shape above), remove the block
  from `_candidates.md`. Present next candidate.
- **refine** → the owner edits the trigger wording; write the refined version to
  `entries/`, remove the block. Present next candidate.
- **drop** → delete the block from `_candidates.md`. **No "passed"/"dropped" log.**
  Present next candidate.
- **context** → fetch the surrounding paragraph from the source file (the originating
  source recorded in the `## From ingest:` section header). Show ~3–5 sentences of
  surrounding context, then re-present the **same candidate** with the prompt again.
  Do NOT advance to the next candidate. The "context" response never counts as a decision.

After the last candidate is resolved, confirm: "*[Journal] candidates drained — [N] kept,
[N] dropped.*" Then update `_session.md` open candidate count to zero.

When `_candidates.md` is empty, the file shows the header only. At the start of a session
that touches a journal, the agent nudges: "*You have [N] candidates in [journal].*" (a
nudge, not a block).

---

## Grail Rule 2 Routing (to-dos leave the notebook)

The diary never holds a to-do. When Direct / Proactive / Migration content is
action-shaped ("I need to…", "follow up with…", "build…", "email…"):

1. The agent does NOT write it to `entries/`.
2. It says plainly: "*That's a to-do, not a diary entry — want it in your task list
   instead?*"
3. On a yes, it routes to `grail.config.md` → `todo_target`.
4. On a no, it's dropped — it does not go in the diary either way.

The diary holds the *thinking that might generate a to-do* (the idea, the belief, the
tension) — never the action item itself. This is the commonplace-book's one rule, made
operational.

---

## Session Close — Write `_session.md`

At session close (or when the owner signals done with Grail work), update
`{journal_root}{slug}/_session.md`:

1. **`last_updated`** → today's date.
2. **`Last ingest processed`** → the source filename from this session, if any. Leave
   unchanged if no ingest ran.
3. **`Open candidates`** → recount from `_candidates.md`. Write the number. If drained to
   zero, write "none."
4. **`Criteria changes since last review`** → if any criterion was renamed, reworded, or
   added this session, append a line: `[date] — [what changed] — [the owner's reason,
   verbatim or near-verbatim]`. Do NOT overwrite prior lines — append only. If no changes,
   leave existing lines untouched.
5. **`Priors`** → if the owner flagged an entry this session as load-bearing ("this
   connects to what we're building," "keep this in mind"), add a link + one-line reason.
   Remove any prior that's no longer relevant if the owner says so.
6. **`Open threads`** → add any question or tension the owner named but didn't resolve.
   Remove threads that resolved this session.

Write discipline: this file is append-or-update, never wholesale replace. Prior lines in
`Criteria changes` and `Priors` are the audit trail — they accumulate.

---

## What This Phase Must NOT Do (summary of the boundary)

- Must not interpret, summarize, or reframe any trigger when surfacing.
- Must not propose connections or say "this relates to…".
- Must not rank beyond the setup priority in the config.
- Must not invent a criterion or surface anything that can't name a config criterion.
- Must not keep a "passed" / "dropped" / "skipped" log of its rejected guesses.
- Must not auto-promote, auto-truncate at the cap, or auto-retrofit the back-catalogue.
- Must not write a to-do into the diary.
