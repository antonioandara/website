# Three-color tile map

The only published experiment is `/experiments/three-color-mosaic.html`, linked
from the homepage. It explores Boolean formulas using connected logic-gadget
tiles, with input toggles and animated local constraint repairs.

Serve the repository root with `npm start`. Build with `npm run build:three-color`
(included in `npm run build`) and verify with `npm run test:three-color`.

The build precomputes the default NAND map through
`build/GenerateDefault.elm` and `build/generate-default.mjs`, writing
`src/Generated/DefaultTiling.elm`. This moves cell packing, constraint validation,
and border smoothing out of page startup. The cache keeps curved SVG outlines,
labels, and graph constraints; generation-only polygon samples are omitted.
The normal coloring and propagation controls still run in the browser.
Custom formulas generate their geometry as before. Rebuild after changing the
geometry algorithm so the default cache stays current; the tests compare cached
outlines and constraints with freshly generated geometry.

Local Chromium measurement with external fonts blocked: default bundle execution
dropped from about 8.2 seconds to 8 milliseconds; the map was ready in about
170 milliseconds. Network and device speed still affect actual load time.

The Elm implementation originated in Antonio’s
`/home/a3l/programming/three-color/elm-port/src` project. Website changes are local;
the original project is not required at build or runtime.

`color-experiments.css` supplies the site styling. The page shares the homepage’s
stored theme preference and links directly back to the experiments section.

## Retired routes

`three-color.html`, `formula-comparison.html`, and `map-drawing-puzzle.html`
were earlier names for this experiment. They now redirect permanently (HTTP 301)
to `three-color-mosaic.html` in the local preview through the root `_redirects`.
GitHub Pages does not read that route map; those retired URLs use its custom
404 page.
`ascii-automata.html` was removed with no replacement and returns a genuine
HTTP 404. The local preview server (`scripts/serve.py`) applies the same map.

## Signal propagation

Each formula is compiled into three-color gate gadgets. Tile contacts preserve
the gadget edges; opposite map edges do not connect. Only palette clues and
inputs are fixed. OUT is determined by the constraints, not by a supplied
truth-table result.

`SignalPropagation.elm` starts from the currently displayed colors. A changed
input releases conflicting neighbors. If those tiles cannot settle while the
surrounding colors stay frozen, the repair area expands across another layer
of shared borders. Local constraint search prefers previous colors and records
its assignment steps. Pale tiles (and `?` labels) are unresolved, not a fourth
settled color. All assigned neighbors differ, and the final map is a complete
three-coloring. This models constraint settling, rather than physical gate timing.

The Step propagation control advances actual colors. New inputs can interrupt
an in-flight repair, which restarts from the current partial coloring.

## Cell geometry

Cells grow from the embedded gate constraints using a distance-ordered front
with axial and diagonal travel costs. Copies of equal fixed pins or the same
input merge, with faster growth for input and signal cells. Remaining space is
claimed by compatible neighbors, including neutral `n` regions; flexible extra
cells fill junctions that cannot accept a fixed palette color.

Every added contact must admit a coloring for every input assignment. The
original gadget contacts remain protected, so filling the frame preserves the
logic and keeps OUT derived from the inputs. Corner bridges connect compatible
cells, and thin physical components grow additional layers while protecting
donor connectivity. Tiny raster junction holes collapse into shared meeting
points, with no extra graph edge. Failed packing contacts are cached and witness
validation stops at the first failure. Geometry stays the same when inputs change.

Borders are relaxed together for 24 passes, with junctions and the frame
anchored and displacement bounded. Both cells on a shared border use the same
coordinates and quadratic curve. Checks verify complete frame coverage, original
logic contacts, all truth-table rows, causal recoloring, and curved outlines
without interior overlaps or escaped labels. Labels are checked against samples
of the final quadratic contours and relocated to a clear interior point when
a junction changes their original position.
