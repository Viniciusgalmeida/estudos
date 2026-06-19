# Read Chapter 3 — Coupling, Abstractness, Instability, and Distance from the Main Sequence

User has read the coupling/metrics section of Chapter 3. Core material: measuring modularity through afferent/efferent coupling, instability, abstractness, and the Main Sequence.

## Key concepts absorbed

**Afferent coupling (Ca)** — incoming dependencies. How many modules depend ON this module.
**Efferent coupling (Ce)** — outgoing dependencies. How many modules THIS module depends on.

**Instability (I)** — I = Ce / (Ce + Ca). Range 0–1.
- I = 0 → stable (many callers, hard to change without breaking them)
- I = 1 → unstable (many outgoing, free to change)

**Abstractness (A)** — A = abstract elements / total elements. Range 0–1.
In JS without classes: accepting function parameters (dependency injection) is the abstraction mechanism.

**Distance from Main Sequence (D)** — D = |A + I − 1|. Range 0–1. D=0 is ideal.
- Zone of Pain: low A + low I (stable + concrete). Many callers, nothing abstract, impossible to evolve.
- Zone of Uselessness: high A + high I (abstract + unstable). Beautiful abstraction, zero callers.
- Main Sequence: the diagonal where A + I ≈ 1. Stable things are abstract; unstable things can be concrete.

**JavaScript abstraction** — injecting a `send` function parameter rather than calling Twilio directly is the JS-idiomatic way to increase Abstractness (A).

## Implications for future sessions

- Do not re-introduce Ca/Ce/I/A/D as new concepts.
- Next natural topic: **connascence** (also Ch. 3). A more nuanced framework for naming coupling types (static vs dynamic, strength ordering). It extends what "coupling" means beyond simple dependency counts.
- Can probe: given a module description with Ca/Ce counts, can user compute I, estimate A, and place it on the sequence?
- Can probe: given a Zone of Pain scenario, can user propose the injection-based fix?
- The "stable → abstract" rule should become an instinct when reviewing pull requests or design proposals.
