/* Browser capabilities only. All UI decisions live in FieldManual.Reader. */
const app = Elm.LibraryPage.init({ flags: { theme: document.documentElement.dataset.theme || 'dark' } });
app.ports.persistTheme.subscribe(({ name, color }) => {
  document.documentElement.dataset.theme = name;
  document.querySelector('meta[name="theme-color"]').content = color;
  try { localStorage.setItem('manual-theme', name); } catch (_) {}
});
let scheduled = false;
function notifyScroll() {
  if (!scheduled) {
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      app.ports.scrollObserved.send(null);
    });
  }
}
addEventListener('scroll', notifyScroll, { passive: true });
document.fonts?.ready.then(notifyScroll);
notifyScroll();
