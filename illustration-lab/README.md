# Illustration lab

An isolated playground at `/illustration-lab/`. Serve the repository with `npm start`, then open http://localhost:8000/illustration-lab/.

Build from the repository root with `npm run build:lab`. The compiled `lab.js` is included. This lab has its own Elm entry point, styles, and browser bridge. It reads the existing `FieldManual.Illustrations` module for the fractal and cellular automaton; it does not change the main site's entry points or navigation.

- **Bézier:** drag handles with a mouse or touch, use the equivalent keyboard-accessible sliders, scrub the construction, or play/pause.
- **Signal:** amplitude, cycles, phase, and playback.
- **Fractal:** depth 0–5, showing actual recursive geometry.
- **Cellular rules:** rules 0–255, presets, single seed, fixed dead boundaries.
- **Three-color map:** a 12-region hexagonal patch, editable colors, adjacency graph, and conflict detection. Region numbers and A/B/C labels supplement color.
- **Multiplexer:** four switchable data bits and a two-bit select address, with the selected path highlighted.
- **Datapath:** a 4-bit register with ADD/XOR feedback and manual clock edges; addition wraps modulo 16.
- **Systolic array:** a 3×3 matrix multiplication with staggered operands, partial sums, and seven clock steps with rewind.
- **FPGA fabric:** conceptual LUT blocks with AND/XOR inputs, a buffer destination, and two selectable routes. This is not a vendor-specific fabric or timing simulation.
- Reset the current experiment, switch themes, and export the current SVG with its colors embedded.

Animation starts paused and is opt-in. Switching experiments pauses playback. Elm animation-frame subscriptions only run while playing. Drag coordinates are mapped through the SVG screen matrix. Export captures the current frame.

The digital illustrations and their state live in `src/Digital.elm`, integrated through `src/Lab.elm`. Run `npm run test:lab` for browser checks covering the models and controls.

Add experiments in `src/Lab.elm`; put lab-only styles in `lab.css`. Keep reusable drawing functions pure so successful experiments can later be moved into the main illustration library deliberately.

Interaction inspiration: https://cartesian.app/ and https://www.makingsoftware.com/ (the latter could not be retrieved during implementation).

## Publishing

This lab is a developer playground. It is not linked from any public page and
is excluded from the production runtime allowlist in the root `README.md`.
Build it separately with `npm run build:lab`; the committed `lab.js` is only
needed when the lab is served.
