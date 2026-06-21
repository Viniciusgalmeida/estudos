# Read Chapter 3 — Connascence

User has read the connascence section of Chapter 3. Core material: naming and ordering coupling types by strength, static vs dynamic distinction, and the locality principle.

## Key concepts absorbed

**Definition** — Two components are connascent if a change in one requires a corresponding change in the other. Stronger connascence = harder to discover and fix.

**Static connascence** (visible in source code):
- CoN (Name) — weakest; a shared identifier. Fix with a rename tool.
- CoT (Type) — a shared type contract.
- CoM (Meaning) — magic numbers/strings that require shared interpretation.
- CoP (Position) — argument order; silent bugs when callers swap values.
- CoA (Algorithm) — duplicated algorithm that must stay in sync.

**Dynamic connascence** (only visible at runtime):
- CoE (Execution) — order of function calls matters.
- CoTm (Timing) — timing matters (race conditions).
- CoV (Values) — related values must change together at runtime.
- CoI (Identity) — two components must reference the same instance; strongest.

**Key rules:**
1. Dynamic is always worse than static — bugs are invisible until runtime.
2. Locality: as components move farther apart (same file → module → service), minimize connascence strength.
3. Across service boundaries: CoN only is safe.

**The refactoring moves:**
- CoM → CoN: extract magic values into named constants.
- CoP → CoN: replace positional args with named-object parameter.
- CoA → CoN: extract duplicated algorithm into a shared function.

**Relationship to previous learning:**
Ca/Ce (Lesson 6) measures coupling quantity. Connascence measures coupling quality. A module can have low Ce (few dependencies) but still have strong CoA — dangerous despite the small count.

## Implications for future sessions

- Do not re-introduce the strength ladder as new material.
- Can probe: given a code smell, can user name the connascence type and propose the weakening move?
- Natural next chapter: Ch. 4 or architectural characteristics (Part II of the book).
- The CoP → CoN move (object params) is an instinct to build for everyday JS code review.
