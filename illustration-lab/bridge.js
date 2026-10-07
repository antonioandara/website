const app = Elm.Lab.init({node: document.getElementById('lab')});
// Pointer coordinates are converted through the SVG's screen matrix, including
// scaling and letterboxing. Elm owns the curve and all experiment state.
let drag = null;
document.addEventListener('pointerdown', event => {
  const handle = event.target.closest('[data-handle]');
  if (!handle || (event.pointerType === 'mouse' && event.button !== 0)) return;
  drag = {index: Number(handle.dataset.handle), svg: handle.ownerSVGElement, pointer: event.pointerId, handle};
  handle.setPointerCapture(event.pointerId);
  event.preventDefault();
});
document.addEventListener('pointermove', event => {
  if (!drag || drag.pointer !== event.pointerId) return;
  const matrix = drag.svg.getScreenCTM();
  if (!matrix) return;
  const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse());
  app.ports.dragPoint.send({index: drag.index, x: point.x, y: point.y});
});
for (const name of ['pointerup', 'pointercancel', 'lostpointercapture']) {
  document.addEventListener(name, event => { if (drag?.pointer === event.pointerId) drag = null; });
}
// Keep the standalone page theme in sync; the main website's preferences stay separate.
new MutationObserver(() => {
  document.documentElement.dataset.theme = document.querySelector('.lab').dataset.theme;
}).observe(document.querySelector('.lab'), {attributes: true, attributeFilter: ['data-theme']});
app.ports.exportSvg.subscribe(() => {
  const source = document.querySelector('#experiment-canvas svg');
  const clone = source.cloneNode(true);
  const originals = [source, ...source.querySelectorAll('*')];
  const copies = [clone, ...clone.querySelectorAll('*')];
  originals.forEach((node, index) => {
    const style = getComputedStyle(node);
    for (const key of ['fill','stroke','stroke-width','stroke-dasharray','stroke-linecap','stroke-linejoin','vector-effect','opacity','font-family','font-size','font-weight']) copies[index].style.setProperty(key, style.getPropertyValue(key));
  });
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  clone.removeAttribute('aria-hidden');
  clone.style.background = getComputedStyle(document.documentElement).getPropertyValue('--paper');
  const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(clone)], {type:'image/svg+xml'}));
  const link = document.createElement('a');
  link.href = url; link.download = 'andara-illustration.svg'; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
