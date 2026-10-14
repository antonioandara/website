/* Browser capabilities only. All UI decisions live in FieldManual.Reader. */
const storedLanguage = (() => {
  try { return localStorage.getItem('manual-language') || document.documentElement.lang || 'en'; } catch (_) { return 'en'; }
})();
document.documentElement.lang = storedLanguage.startsWith('es') ? 'es' : 'en';
const app = Elm.Main.init({ flags: { theme: document.documentElement.dataset.theme || 'dark', language: storedLanguage } });
app.ports.persistTheme.subscribe(({ name, color }) => {
  document.documentElement.dataset.theme = name;
  document.querySelector('meta[name="theme-color"]').content = color;
  try { localStorage.setItem('manual-theme', name); } catch (_) {}
});
app.ports.persistLanguage.subscribe(name => {
  document.documentElement.lang = name === 'es' ? 'es' : 'en';
  try { localStorage.setItem('manual-language', name); } catch (_) {}
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
