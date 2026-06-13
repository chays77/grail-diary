<!--
  journal.config.md TEMPLATE — the Phase 0 (Grail Listener) interview fills this in,
  one per journal, written to {journal_root}{slug}/journal.config.md.

  This is the AUTHORITATIVE source of a journal's capture criteria. Phase 1 reads it on
  every capture. It is never inferred at capture time. Every surfaced candidate must name
  one of the criterion labels below — a candidate that cannot name one CANNOT be surfaced.

  Replace every [bracketed] placeholder. Delete this comment block in the real config.
-->
---
journal: [name]                          # human-readable, e.g. "My Book"
slug: [kebab-case]                       # folder name: lowercase-with-hyphens, e.g. my-book
type: Project | Memory | Reflective | Gratitude   # v1 set (grail.config.md), extensible
created: YYYY-MM-DD
journal_root: [resolved from grail.config.md — do NOT hardcode by hand]
anchor: "[optional — a single line shown on the diary's title page]"
framing_primer:
  purpose: "[Framing Q1 — what this journal is for, one line]"
  hope_to_keep: "[Framing Q2 — what you hope is in it a year from now]"
ingest_sensitivity: generous | conservative   # from interview Q9. Per-journal.
                                               #   generous = lower threshold, wide net
                                               #   conservative = only clear matches
---

# [Journal Name] — Capture Criteria

> What this journal captures, in the owner's words. The agent APPLIES these criteria;
> it does not invent them. Every surfaced candidate names the criterion it matched.

## Criteria (the filter)

<!-- One bullet per criterion. Label is what Phase 1 cites in the Filter Line. -->
<!-- Description is the owner's words from Q5 (verbatim or near-verbatim; flag any paraphrase). -->

- **[criterion-label-1]** — [verbatim / near-verbatim description from Q5]
  - priority: high | normal          # from Q7 — the ONLY ordering the agent may apply
  - shape: quote | claim | question | moment | source | sketch   # from Q3 — or the
                                     #   owner's own words if none of these fit
- **[criterion-label-2]** — [...]
  - priority: high | normal
  - shape: [...]
- **[criterion-label-3]** — [...]
  - priority: high | normal
  - shape: [...]

## Priority

<!-- OPTIONAL — from Q7, in the owner's words: the thing they'd hate most to miss.
     Delete this section if the owner named no priority. The rendered diary prints
     it on the rules page. -->

[Verbatim from Q7 — e.g. "The fixes. That's the stuff I lose."]

## The Bar (when to flag vs. let pass)

[Verbatim from Q6 — the noise/signal line. This is the threshold. Without it the agent
has no basis to let anything pass, and proactive/ingest surfacing has no floor.]

## Does NOT belong (negative criteria)

- [From Q8 — what is excluded even if interesting. Prevents over-surfacing.]

## Voices that trigger capture

[From Q4 — whose words count: yours / a colleague's / a guest's / a book or source /
a person you love. Establishes whether ingest sources and personal/relational voices
count for this journal.]

## Interview notes

<!-- OPTIONAL — the keep-test (Q1) and lose-test (Q2) answers, verbatim. NOT operative
     criteria — the agent never surfaces against this section. Kept so the owner's most
     concrete filter language isn't lost. Delete if the owner prefers. -->

- Keep test: "[Q1, verbatim]"
- Lose test: "[Q2, verbatim]"
