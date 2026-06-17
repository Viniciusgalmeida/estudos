# estudos

Study workspace. Each subject lives in its own folder.

## Structure

```
estudos/
├── <subject-name>/       # one folder per subject
│   ├── MISSION.md        # why you're learning this
│   ├── NOTES.md          # teaching preferences, working notes
│   ├── RESOURCES.md      # curated sources
│   ├── lessons/          # HTML lesson files (0001-name.html, ...)
│   ├── reference/        # HTML cheat sheets / glossaries
│   └── learning-records/ # key insights (0001-name.md, ...)
└── CLAUDE.md             # this file
```

## Starting a New Subject

1. Create folder: `mkdir <subject-name>`
2. `cd <subject-name>`
3. Run `/teach <subject>` — the skill will ask about your mission and bootstrap the workspace

## Continuing a Subject

1. `cd <subject-name>`
2. Run `/teach` — reads existing MISSION.md and learning-records to pick up where you left off

## Dashboard

Run from `estudos/` root to regenerate `dashboard.html` after adding new lessons:

```bash
npm run dashboard
```

Open `dashboard.html` in browser (WSL path: `\\wsl.localhost\Ubuntu-22.04\home\vinidev\Development\estudos\dashboard.html`).

## Rules

- Never create study files at the root — always inside a subject folder
- Subject folder names: lowercase, hyphen-separated (e.g. `rust-ownership`, `linear-algebra`)
- The `/teach` skill manages all files inside the subject folder; don't restructure them manually
