# Read Chapter 3 — Cohesion (Modularity)

User has read the cohesion section of Chapter 3. Core material: cohesion as a measure of how much module parts belong together.

## Key concepts absorbed

**Cohesion definition** — degree to which the parts of a module belong together. High cohesion = single purpose. Low cohesion = multiple unrelated responsibilities crammed together.

**The "AND" heuristic** — if a module is described with "and" (it does X and Y and Z), it likely lacks cohesion. This is the fast practical test.

**Seven cohesion types (worst → best)**:
1. Coincidental — grouped by accident (Utils dumping ground)
2. Logical — similar operations, caller passes flag to select behavior
3. Temporal — grouped by timing (init routines)
4. Procedural — sequential steps
5. Communicational — operate on same data, different ops
6. Sequential — output of one feeds next
7. Functional — single well-defined purpose (best)

**LCOM (Lack of Cohesion in Methods)** — measures how many independent field-access clusters exist within a class. High LCOM = methods don't share instance variables = class is secretly multiple classes. Signal to investigate; not an automatic verdict to split.

**Architectural scale** — cohesion applies at class, service, and team level. A service doing auth AND billing notifications has low cohesion. The "change together / apart" test applies at all scales.

## Implications for future sessions

- Do not re-introduce LCOM or cohesion types as new concepts.
- Next natural topic: **coupling** (afferent/efferent). Completes the modularity picture. The goal is always "high cohesion, low coupling."
- Can probe: given a real class description, can user identify the cohesion type and propose a refactor?
- Can connect to connascence (later in Ch. 3) — a more nuanced coupling/cohesion framework.
- User should be able to apply the "AND test" instinctively when reviewing code or design proposals.
