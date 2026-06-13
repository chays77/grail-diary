# The Grail Criteria Review — Periodic Tuning Pass

> Lightweight criteria-refinement skill. Companion to `grail-capture.md` Entry Point C.
> Runs AFTER one or more ingest passes, when the owner wants to tune a journal's filter.
> Reads paths from `grail.config.md`. Writes only to `journal.config.md` — never to
> `entries/`.

---

## §0 The Governing Constraint (identical to the rest of the package)

> **The system surfaces. The human connects.** The agent may surface a PATTERN it
> observed (what fired, what nearly fired, what was dropped). It may NEVER propose a
> criterion on its own authority. Any criterion that ends up in the config must be
> traceable to the owner's words, exactly as in Phase 0.

**This skill is not a second Phase 0.** The Phase 0 interview (`grail-listener.md`) is the
full re-excavation — run it when the owner wants to rethink a journal from scratch. This
skill handles the narrower case: one or more ingest passes have run, the `_candidates.md`
pass history has signal, and the owner wants to sharpen or extend the existing filter
without a full re-interview.

---

## When to Invoke

| Trigger | What it means |
|---|---|
| A single ingest batch exceeded the cap (`ingest_candidate_cap`) multiple times | Criteria may be too broad — surfacing noise |
| The owner kept very few candidates from a recent ingest | Criteria may be too narrow — missing real material |
| The owner dropped a cluster of candidates that had something in common | A negative criterion may be missing, or an existing one is misfiring |
| The owner notices candidates that cleared the bar but felt wrong | The Bar description may need sharpening |
| The owner saw items during ingest that were clearly worth keeping but weren't surfaced | A criterion may be absent or under-described |
| The owner says "let's tune the filter" / "the criteria feel off" / "I keep dropping the same kind of thing" | Direct request |

Do NOT invoke automatically. This is an owner-initiated pass, not a session-start routine.

---

## What the Skill Reads

Before surfacing anything, the agent reads:

1. `{journal_root}{slug}/journal.config.md` — the current criteria, the bar, the exclusions
2. `{journal_root}{slug}/_candidates.md` — the current unconfirmed batch (if any)
3. Any prior ingest sections in `_candidates.md` that have already been drained (the
   section headers survive even when blocks are removed — they record the source name
   and date, and the volume count if the overflow flag fired)

The agent does **not** read `entries/` to analyze what was kept. Kept entries are the
diary — reviewing them to infer patterns would be the agent connecting, which is forbidden.
Signal comes only from the **surfacing layer** (what fired, what was flagged over-cap) and
from the owner's explicit statements during this session.

---

## The Review — Three Signal Types

The agent surfaces observations across three signal types, in this order. It presents
**one signal at a time**, waits for the owner's response, then moves to the next.

### Signal Type 1 — Volume / Coverage Signal (from `_candidates.md` history)

What the agent looks for:
- Ingest batches that repeatedly exceeded `ingest_candidate_cap` → possible criteria-too-broad
- Ingest batches that produced 0–2 candidates on a source that felt rich to the owner →
  possible criteria-too-narrow or a missing criterion
- A single criterion label that appears in the majority of surfaced candidates → may be
  doing all the work; other criteria may be dead weight or too narrow

**How it surfaces (canonical format):**

```
Signal [Type 1 — volume]: [criterion-label] fired [N] times across [M] ingests.
[If over-cap:] [K] of those batches exceeded the cap of [cap] — criteria may be surfacing broadly.
[If low-fire:] [criterion-label] fired [N] times — may be under-described or rarely present.
Worth looking at, or leave it?
```

The agent does **not** say "you should broaden/narrow this." It surfaces the count and
asks. The owner decides whether it's a problem.

### Signal Type 2 — Drop Pattern Signal (from this session's keep/refine/drop pass)

Only available if the owner ran a keep/refine/drop pass during this session and the agent
observed the drops. The agent may only use what the owner said or did in this session — it
does not analyze prior sessions' drops from memory.

What the agent looks for:
- A cluster of dropped candidates that shared a surface characteristic (same source type,
  same voice, same topic area the owner mentioned) — visible from this session's pass only
- A candidate the owner refined significantly before keeping — the original wording may
  indicate a criterion description that isn't matching the right grain

**How it surfaces:**

```
Signal [Type 2 — drop pattern]: In this session's pass, [N] drops shared [observable
characteristic — e.g. "all came from the Q&A section of the transcript" or "all were
questions rather than claims"]. Is that worth capturing as an exclusion, or was it
specific to this source?
```

The agent describes the observable pattern only — never interprets why the owner dropped
them.

### Signal Type 3 — Near-Miss Signal (owner-reported only)

The agent does **not** speculate about what "almost" matched. It has no channel for that.
Near-miss signal comes only from what the owner says explicitly during this session:
"I saw something in that transcript that should have fired and didn't" or
"there's a pattern I keep noticing that doesn't have a criterion."

When the owner names something:

```
Signal [Type 3 — near-miss]: You flagged that [owner's description] didn't surface.
Based on what you said, that sounds like it could be: [reflect the owner's words back,
not a new label] — is that worth adding as a criterion?
```

Reflect. Do not name or label until the owner confirms the description in their own words.

---

## The Refinement Pass — What Happens After Each Signal

After surfacing a signal, the owner responds. There are five outcomes:

### A — Leave it
"That's fine / no / not worth changing." The agent moves to the next signal. No update.

### B — Sharpen an existing criterion
The owner describes how an existing criterion should change.

**Process:**
1. The agent shows the current criterion description.
2. It asks: "How would you restate it?"
3. The owner gives the new wording in their own words.
4. The agent reads it back verbatim: "So it becomes: *[the owner's exact words]*. Correct?"
5. On confirmation, the agent updates that criterion's description in `journal.config.md`.
   It does NOT change the label (the label is what Phase 1 cites — changing it would orphan
   existing entries). It appends `last_refined: YYYY-MM-DD` to that criterion's block.

### C — Tighten the Bar
The owner indicates the current bar description is letting too much through or cutting
too much.

**Process:**
1. The agent shows the current Bar text.
2. It asks: "How would you redraw the line?"
3. The owner restates it.
4. Verbatim read-back → confirmation → update `## The Bar` in `journal.config.md`.

### D — Add a new criterion
The owner names something that isn't covered.

**Process:**
1. Ask: "What would you call it — give me a label and a description in your words."
2. The owner provides both (or the agent offers a label suggestion based on the owner's
   words and asks them to confirm it).
3. Ask the required fields: "Priority — high or normal?" and "Shape — what form does
   it usually come in?" (quote / claim / question / moment / source / sketch)
4. Ask: "Is there anything that looks like this but shouldn't fire? Should I add it to the
   exclusions?" (One question — do not force an exclusion if the owner has nothing.)
5. Verbatim read-back of the full new criterion block → confirmation → append to
   `## Criteria` in `journal.config.md`. Add `added: YYYY-MM-DD`.

### E — Add or refine an exclusion
The owner identifies something that keeps surfacing but shouldn't.

**Process:**
1. Ask: "How would you describe what doesn't belong?"
2. The owner describes it.
3. Verbatim read-back → confirmation → add to `## Does NOT belong` in `journal.config.md`.

---

## The Hard Limits (what this skill must NOT do)

- Must not propose a specific new criterion label or description without the owner naming
  it first. The agent may offer a label to confirm, never to originate.
- Must not infer what the owner "probably meant" when they dropped candidates.
  Drop-pattern signal describes the observable; the owner supplies the meaning.
- Must not change a criterion label (only description, bar, exclusions, or add new
  criteria). Changing labels orphans existing `matched_criterion` fields in `entries/`.
- Must not run an audit pass over `entries/` — kept entries are the diary and belong to
  review, by the human. This skill reads only `_candidates.md` and the config.
- Must not trigger automatically (not a session-start check, not a post-ingest auto-run).
  The owner invokes it; the agent does not.
- Must not run Phase 0 (the full Listener interview) — if the owner wants a full
  re-excavation, route to `grail-listener.md` instead.

---

## Write Discipline (the only writes this skill makes)

All writes are to `{journal_root}{slug}/journal.config.md` only.

**Before any write:**
1. Show the exact change: "Here's the updated block — *[show the changed lines only]*."
2. The owner confirms.
3. Only then write.

**Never:**
- Write without explicit confirmation of the exact wording.
- Rewrite unaffected sections of the config (change only what was agreed).
- Write to `entries/`, `_candidates.md`, or any other file.

---

## Closing the Pass

When all three signal types are exhausted (or the owner says "that's enough"):

1. Summarize the changes made in one block:
   - Criteria sharpened: [list label + what changed]
   - Bar updated: [yes/no]
   - New criteria added: [list labels]
   - New exclusions added: [list]
   - No change: [any signal type the owner decided to leave]
2. Confirm: "`journal.config.md` updated. The next ingest pass will use the revised
   filter."
3. If no changes were made, confirm: "No changes — criteria unchanged."

No commentary on whether the criteria are "good" now. That is not the agent's call.

---

## When to Route to `grail-listener.md` Instead

Route back to the full Phase 0 interview if:
- The owner says "I want to rethink this journal from scratch" / "the whole thing feels off"
- More than 3 criteria need replacing (not sharpening) — at that point it's a full
  re-excavation
- The journal type is changing (e.g. started as Project, now feels Reflective)

The criteria review is a scalpel. The Phase 0 interview is the full excavation.
