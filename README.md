# The Grail Diary

**Outsource the typing. Keep the thinking.**

A folder-based commonplace-book system for Claude. Your AI captures raw material into named journals against criteria *you* defined — and is structurally forbidden from telling you what any of it means. The connections stay yours.

---

## Why This Exists

If you work with AI every day, you've probably felt the quiet version of this worry: the machine is getting better at the part of the work that used to be *you*. Summaries arrive pre-digested. Patterns arrive pre-connected. You read conclusions you didn't reach.

The faculty that erodes first isn't writing — it's *noticing*. Noticing that a line in a podcast connects to the thing you're building. Noticing that two ideas from different worlds are the same idea. That noticing-and-connecting muscle is built by reps, and every time the AI does the rep for you, you skip the workout.

This system is built around a single boundary: **the system surfaces, the human connects.** The AI does the clerical work a notebook demands — capturing, filing, formatting, rendering. It never does the work the notebook exists for.

I built this for myself first — for the book I'm writing. My main journal is past ninety entries, fed by podcast transcripts, books, sermons, and live working sessions. Everything below is how it actually runs, not how it might run.

## The Method

This is a commonplace book — the practice Da Vinci, Darwin, and Twain kept: one book, everything worth keeping collected in it, flipped through constantly so old notes collide with new ones. I learned the modern version of the practice from Perry Daniels, who calls his the Grail Method, after Henry Jones Sr.'s diary in *Indiana Jones and the Last Crusade* — a lifetime of scraps, sketches, and clippings in one battered book that turns out to hold the answer.

The practice has two rules, and the whole system enforces them:

1. **No self-editing at capture.** Everything offered goes in. The inner critic is bypassed at write-time; filtering happens later, at review.
2. **No to-do lists in the notebook.** To-dos are ephemeral clutter that kill creative thinking. They route to your task list — never the diary. The diary holds the *thinking* that might generate a to-do, never the to-do itself.

## The Guardrail: the Filter Line

Here is the load-bearing mechanic. When the AI surfaces something it thinks belongs in a journal, it is allowed to say exactly two things:

```
> "[the verbatim quote, exactly as said]"
— matched: [which of YOUR criteria it matched]
```

(That's the short form — the full block in `grail-capture.md` also names the journal and
the capture source.) That's the whole message. It may not say why it matters. It may not propose a connection. It may not summarize, reframe, or rank beyond the priority you set. **A candidate that can't name one of your criteria can't be surfaced at all** — so the AI has no channel for its own opinion of what's significant.

You respond **keep / refine / drop**. You did the thinking once, deliberately, when you defined the criteria. The AI applies your filter; it never invents one.

## How It's Organized

The system manages any number of **scoped journals**, each with its own capture criteria:

```
journals/
├── my-book/                  ← a focused journal
│   ├── journal.config.md     ← its criteria, in your words (the setup interview writes this)
│   ├── entries/              ← one markdown file per confirmed entry
│   ├── _candidates.md        ← surfaced-but-unconfirmed, waiting for your keep/refine/drop
│   ├── _session.md           ← session state: last ingest, open candidates, threads
│   └── diary/index.html      ← the rendered flippable book (build-diary.js)
├── daybook/                  ← the always-on catch-all
└── _sticky-notes/            ← the "not yet filed" holding pen (not a journal)
```

Three landing places, and the distinction matters:

| Landing place | What it is | How material gets in |
|---|---|---|
| **Focused journal** | A scoped book with criteria from its setup interview | You add directly, **or** the AI surfaces candidates that pass the criteria |
| **Daybook** | The always-on catch-all | **Direct capture only** — you say "just jot this." No filter at the door |
| **Sticky-notes pen** | A holding pile, not a journal | Old un-filed scraps; drained by hand over time |

The Daybook is direct-only on purpose. It holds your own deliberate thinking — material that arrives with intention already engaged, so it needs no filter. *Accidental discovery* — a line surfacing from a transcript you weren't mining — is different: it routes to a focused journal, where it has to pass criteria you set. The AI has no channel to put anything in the Daybook on its own. Your inner world is captured by choice; the outer world is filtered by your stated rules.

## Setup

You'll need Claude Code (or any AI agent that can read a folder and edit files). Node.js is only needed to build the rendered diary.

1. Clone or download this folder.
2. Open it in Claude Code (or upload it to a Claude project).
3. Edit `grail.config.md` — add your name, and point `backcatalogue_sources` at any existing note folders you have.
4. Say: **"Set up a Grail journal for [the thing you care about]."**

That triggers the **setup interview** (`grail-listener.md`) — and this is the real work of the system, so don't rush it. Nine questions, one at a time: what makes something belong in this book, what have you lost before that you wish you'd kept, whose voices count, what three things should be watched for, where's the line between signal and noise. Your answers — verbatim, not paraphrased — become the journal's capture criteria. The interviewer is forbidden from proposing criteria or interpreting your answers. If it tightens your wording, it has to flag that and ask.

The criteria are the thinking, done once, deliberately. Everything after is the machine applying your filter.

## Daily Use — the Four Ways In

**A — Direct.** "Add this to the book journal." / "Grail this." / "Just jot this" (→ Daybook). Goes straight in, no staging. You asked, so it's confirmed by definition.

**B — Proactive (watch mode).** Off by default. Say "watch the book journal this session" and the AI surfaces candidates live — one Filter Line at a time, as material clears your criteria and your bar. keep / refine / drop, in the moment.

**C — Ingest.** "Run this transcript against the book journal." The AI reads the *entire* source first, collects every match, ranks by how cleanly each hits a named criterion, and stages up to 12 candidates in the journal's `_candidates.md`. Nothing is auto-promoted. Later, you drain the file in one sitting — each candidate presented one at a time, keep / refine / drop / context ("context" fetches the surrounding paragraph from the source). If the scan found more than 12, it tells you the real count — the cap never silently truncates. Repeated overflow is your signal the criteria are too broad.

**D — Migration.** "Drain the sticky notes into the book journal." The AI walks your old notes one at a time against a target journal's criteria — same Filter Line, pointed at your own archive. You say move / skip. No bulk moves, ever.

Every confirmed entry carries the speaker's name and source, so a quote is always attributable. When a new candidate restates an idea already in the journal, the AI flags the possible duplicate by slug — never deciding for you — and you choose: new entry, stack the quote under the existing entry, or build a theme entry collecting several quotes around one named idea.

## The Rendered Diary

```
node build-diary.js my-book
```

This builds `journals/my-book/diary/index.html` — a flippable book you open straight from disk. Aged paper, a closed leather cover that swings open, your capture criteria printed verbatim as the front matter. No server, no dependencies.

Two design choices in the renderer carry the philosophy:

- **Shuffle-on-open.** Entries are re-dealt in random order every time you open the book. No clustering, no theme grouping, no "related entries," no search. Old notes collide with new ones — that collision is where connections happen, and it's yours to have.
- **Pins.** When a scrap matters, press its wax seal to pin it — pinned scraps hold their spot while the rest re-shuffle. Pinning is you marking a connection you found. The system never pins anything.

Optional: drop a cover photo at `diary/assets/cover.png`, and map hand-drawn sketches to your criteria in the template's `SKETCH` block if you want margin art. The diary runs fine without either.

## Reviewing — Ask for the Pattern, Not the Summary

The review ritual is analog on purpose: open the diary, flip, let the shuffle put strange neighbors next to each other, and notice. No AI in the loop.

When you *do* point the AI back at your archive, there's one move that keeps the boundary intact: **ask for the pattern, not the summary.** "Which criterion has fired most this month" or "show me every entry that quotes [person], verbatim" hands you raw material arranged so you can see it. "What does my journal say about X" hands you a conclusion — and the conclusion is the rep you're trying to keep. The first kind of question makes the machine your filing clerk. The second kind makes it your thinker.

## Tuning the Filter

After a few ingests, run the criteria review (`grail-criteria-review.md`): "let's tune the filter." It surfaces mechanical signals — which criteria fire most, which batches blew past the cap, what you dropped in clusters — and asks whether each is worth acting on. Any change to the criteria happens in your words, read back verbatim before it's written. The AI may observe that a criterion fired forty times; it may never tell you what that means.

## What It Will Not Do

- Tell you what an entry means, why it matters, or what it connects to
- Group, sort, or summarize your journal by theme
- Capture anything into the Daybook on its own
- Keep a log of what you rejected (your AI's rejected guesses shouldn't accumulate into a shadow opinion)
- Put a to-do in the diary

## Folder Contents

```
grail-diary/
├── README.md                    ← You are here
├── CONTEXT.md                   ← Orients the AI agent: governing constraint, object model
├── grail.config.md              ← THE config: paths, your name, the ingest cap. Edit this first.
├── grail-listener.md            ← Phase 0: the setup interview that excavates a journal's criteria
├── grail-capture.md             ← Phase 1: the four entry points, the Filter Line, entry shape
├── grail-criteria-review.md     ← The tuning pass for a journal's filter
├── journal.config.template.md   ← The shape every journal's criteria file takes
├── build-diary.js               ← Builds the flippable HTML diary (pure Node, no deps)
├── diary-template/index.html    ← The diary template the build script scaffolds from
└── journals/                    ← Your journals live here (gitignored by default — they're yours)
    └── _sticky-notes/           ← The "not yet filed" holding pen
```

## Built By

Curtis Hays, Collideascope — [collideascope.co](https://collideascope.co)

Also cohost of **Bullhorns & Bullseyes** — a podcast on marketing, brand, and revenue architecture: [bullhornsbullseyes.com](https://bullhornsbullseyes.com/)

## Acknowledgments

- **Perry Daniels** — the Grail Method itself: one notebook, capture everything, no to-do lists, review constantly. This system is his practice with the clerical work automated and the thinking left alone. [Watch him walk through it](https://youtu.be/_QVYfPnNOg4).
- **Tom Nixon** — my podcast cohost and the source of the line that governs the build: *"Outsource the typing, not the thinking."*
- **Jake Van Clief** — the Interpretable Context Methodology (ICM) that this folder architecture is built on. [Clief Notes](https://www.skool.com/cliefnotes/about)
- **C.S. Lewis** — *The Abolition of Man* lives all through my own journal. The case for why the trained habit of judgment is worth defending.
- **Leonardo da Vinci, Charles Darwin, Mark Twain** — the commonplace-book lineage. They didn't have an AI to do the filing. You do. The deal is the same one they kept: the book holds the scraps; you make the meaning.

## License

MIT — free to use, fork, and adapt. Attribution appreciated but not required.
