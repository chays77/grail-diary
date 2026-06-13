# Grail Diary — Config

> The SINGLE resolvable source of paths and global settings for the Grail Diary.
> Every skill file in this package reads these values instead of hardcoding paths.
> Edit here, not in the prompts.

---

```yaml
# --- You ---
owner:                                        # your name — appears on each diary's title page (optional)

# --- Paths (relative to this folder) ---
journal_root: journals/                       # all scoped journals live under here
sticky_notes_pen: journals/_sticky-notes/     # the visible "not yet filed" holding pen
                                              #   (NOT a journal — see CONTEXT.md)

# --- The always-on default journal ---
daybook_slug: daybook                         # resolves to journals/daybook/
daybook_type: Reflective                      # loose-criteria catch-all for un-scoped jots

# --- Capture behavior ---
ingest_candidate_cap: 12                      # max candidates surfaced per ingest pass.
                                              #   Flags overflow ("criteria may be too
                                              #   broad"), NEVER silently truncates.

# --- Off-notebook routing target (Grail Rule 2) ---
todo_target: TASKS.md                         # where to-dos route (never the diary).
                                              #   Point this at wherever your task list lives.

# --- Existing notes Entry Point D walks (read-only sources) ---
backcatalogue_sources: []                     # add paths to your existing note folders, e.g.
                                              #   - notes/
                                              #   - daily-journal/

# --- Journal types (v1 set, extensible) ---
journal_types:
  - Project      # a thing being built: book, product, app — decisions, sources, open Qs
  - Memory       # moments, things said, texture — what happened that you want to keep
  - Reflective   # thesis/theme development — claims, counter-arguments, tensions, quotes
  - Gratitude    # what you're grateful for — relational, contemplative, brief
```

---

## How Files Resolve Paths

- A journal's folder = `{journal_root}{journal-slug}/` → e.g. `journals/my-book/`
- The Daybook = `{journal_root}{daybook_slug}/` → `journals/daybook/`
- The sticky-notes pen = `{sticky_notes_pen}` → `journals/_sticky-notes/`

## Resolution Discipline (for the agent)

When any Grail file needs a path, it reads it from this config at run time. If a value is
missing, the agent asks the owner rather than guessing a default. The one place a literal
path may appear is this file.
