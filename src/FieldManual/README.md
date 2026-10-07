# Field manual drawing vocabulary

A small library of pure `Html msg` drawing functions. It uses `elm/svg`, has no animation loop, and requires no handwritten JavaScript to render (the Elm compiler generates the runtime JavaScript). Start with the existing components rather than copying drawing markup into pages.

```elm
import FieldManual.Components exposing (chapterHeading, figurePlate)
import FieldManual.Illustrations as Ink

viewSignal =
    figurePlate "FIG.006" "wave study"
        (Ink.signal { amplitude = 65, cycles = 2 })
        "A sampled wave in the time domain."
```

## Available drawings

| Function | Purpose / inputs |
| --- | --- |
| `processorStack` | Upward hierarchy: logic gates, muxes and ALU, datapath, CPU core |
| `computerStack` | Processor board, paired DIMMs, M.2-style storage, and directed data paths |
| `explodedStackDiagram` | Compatibility alias for `computerStack` |
| `touchDiagram` | Capacitive input surface |
| `kernelDiagram` | Weight curve and kernel blocks |
| `bezierDiagram` | Curve and control handles |
| `rasterDiagram` | Letterforms and raster grid |
| `chip` | 24-pin logic package |
| `network` | Six connected nodes and secondary paths |
| `cube` | Isometric solid with hidden construction edges |
| `signal { amplitude, cycles }` | Amplitude clamped to 0–85 SVG units, cycles to 0.5–8 |
| `orbit planes` | One to six intersecting orbital planes |
| `contours levels` | Three to twelve contour levels |
| `cellularAutomaton rule` | Elementary rule 0–255; 47 cells × 24 generations, dead boundaries |
| `gameOfLife` | Computed glider snapshots at generations 0, 4, and 8; B3/S23 |
| `functional` | Pure square function, from input 3 to output 9 |
| `composable` | Explicit input/intermediate/output wires, plus the collapsed g ∘ f pipeline |
| `fractal depth` | Sierpiński triangle, depth 0–5, at most 243 triangles |
| `turingMachine` | Read/write head, tape, state, and an example transition |

`chapterHeading number title subtitle` creates a numbered editorial heading. `figurePlate number title drawing caption` supplies a figure label, grid surface, and explanatory caption. These wrappers provide the text equivalents for the decorative SVGs, which are intentionally hidden from assistive technology. Always give a meaningful caption when adding a new drawing.

## Shared style tokens

The stylesheet exposes `--paper`, `--ink`, `--muted`, `--blue`, `--line`, `--surface`, `--grid`, `--faint`, `--fill`, and `--soft`, with separate light and dark values. Font families are `--serif` and `--mono`. SVG classes `.line`, `.thick`, `.soft`, `.dash`, `.fill-faint`, `.fill-blue`, `.fill-paper`, and `.svg-label` form the drawing vocabulary. Use them instead of literal colors so diagrams automatically adapt to the reader's theme.

SVGs use view boxes and non-scaling strokes. New drawings normally use a 360 × 260 view box, with labels inside the drawing's bounds. Keep diagrams deterministic and bound public parameters to avoid excessive node counts. Add the drawing's metadata and recipe to `Library.elm` to include it in the catalogue.

The responsive figure grid follows the available content width, including when the sidebar is open. No raster assets or image generation are needed to extend this library.

Discrete patterns use `.life-cell`, `.life-empty`, and `.fractal-cell` rather than outlined paths to preserve small-cell readability. Automata, Life snapshots, and fractals are deterministic static drawings generated from their rules, not animations. The catalogue has 18 entries, grouped into Systems, Signals, Objects, Patterns, and Concepts.

## Optional Elm reader shell

`Reader.elm` supplies the application model and update/subscription loop for the homepage and manual essay. Its only ports are `persistTheme` and `scrollObserved`; use the small browser bridge when building the complete reader. `Library.view selectedCategory onSelect onLayoutChanged` is a pure view: its caller owns filter state, and opening recipes emits a layout-change message. Drawings and figure components remain independent of this application shell.
