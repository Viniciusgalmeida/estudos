# estudos

Personal study workspace. Each subject lives in its own folder and is taught interactively via Claude Code.

## Prerequisites

- [Claude Code](https://claude.ai/code) CLI installed and authenticated
- Node.js 18+

## Setup

```bash
npm install
```

## Dashboard

View all lessons across subjects:

```bash
npm run dashboard
```

Opens `dashboard.html`. On WSL, paste this path in your browser:

Regenerate after adding new lessons.

## Starting a New Subject

```bash
mkdir <subject-name>
cd <subject-name>
/teach <subject>
```

The `/teach` skill will ask about your mission and bootstrap the workspace.

Subject folder names: lowercase, hyphen-separated (e.g. `rust-ownership`, `linear-algebra`).

## Continuing a Subject

```bash
cd <subject-name>
/teach
```

Reads existing notes and learning records to pick up where you left off.

## Typical Session

1. Read a chapter or section of your material
2. Run `/teach` — describe what you read
3. Receive a lesson targeting long-term retention
4. Run `npm run dashboard` to see the new lesson listed

## Structure

```
estudos/
├── dashboard.html            # generated — open in browser
├── generate-dashboard.ts     # regenerates dashboard.html
├── <subject-name>/
│   ├── MISSION.md            # why you're learning this
│   ├── NOTES.md              # teaching preferences
│   ├── RESOURCES.md          # curated sources
│   ├── lessons/              # HTML lesson files (0001-name.html, ...)
│   ├── reference/            # cheat sheets and glossaries
│   └── learning-records/     # key insights (0001-name.md, ...)
└── CLAUDE.md                 # workspace instructions for Claude
```
