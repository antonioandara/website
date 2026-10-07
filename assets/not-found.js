(() => {
  const field = document.getElementById('automata');
  const button = document.getElementById('pause');
  let paused = false;
  let timer;
  let columns, rows, cells, history, generation;
  const glyphs = '01#%@[]{}<>';

  function reset() {
    columns = Math.min(200, Math.ceil(innerWidth / 8) + 1);
    rows = Math.min(100, Math.ceil(innerHeight / 16) + 1);
    cells = Array.from({length: columns}, (_, x) => x === Math.floor(columns / 2) || (x * 17 + 5) % 41 === 0 ? 1 : 0);
    history = [];
    generation = 0;
    for (let i = 0; i < rows; i++) evolve();
    render();
  }
  function evolve() {
    const rule = Math.floor(generation / 80) % 2 ? 110 : 30;
    history.push(cells.map((value, x) => value ? glyphs[(x * 7 + generation * 3) % glyphs.length] : ' ').join(''));
    if (history.length > rows) history.shift();
    cells = cells.map((_, x) => {
      const neighbors = (cells[(x + columns - 1) % columns] << 2) | (cells[x] << 1) | cells[(x + 1) % columns];
      return (rule >> neighbors) & 1;
    });
    if (generation % 37 === 0) cells[(generation * 13) % columns] ^= 1;
    generation++;
  }
  function render() { field.textContent = history.join('\n'); }
  function sync() {
    clearInterval(timer);
    button.textContent = paused ? 'Wake the organisms' : 'Pause the organisms';
    button.setAttribute('aria-pressed', String(paused));
    if (!paused && !document.hidden) timer = setInterval(() => { evolve(); render(); }, 180);
  }
  button.hidden = false;
  button.addEventListener('click', () => { paused = !paused; sync(); });
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('resize', reset);
  reset();
  sync();
})();
