"""Local preview. --pages serves a release directory with GitHub Pages-style 404s.

Default development mode reads the local _redirects map. Production preview
serves only its selected directory and does not apply those redirect rules.
"""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import argparse

ROOT = Path(__file__).resolve().parent.parent
REDIRECTS_FILE = ROOT / '_redirects'


def load_redirects():
    """Parse the local `_redirects` file into {source: (dest, status)}."""
    routes = {}
    if not REDIRECTS_FILE.exists():
        return routes
    for line in REDIRECTS_FILE.read_text(encoding='utf-8').splitlines():
        line = line.strip()
        if not line or line.startswith('#'):
            continue
        parts = line.split()
        if len(parts) < 2:
            continue
        source, destination = parts[0], parts[1]
        try:
            status = int(parts[2]) if len(parts) > 2 else 302
        except ValueError:
            status = 302
        if source == '/*':
            continue  # unknown paths fall through to the 404 handler
        routes[source] = (destination, status)
    return routes


REDIRECTS = load_redirects()


class SiteHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_GET(self):
        self._dispatch(self._serve_get)

    def do_HEAD(self):
        self._dispatch(self._serve_head)

    def _serve_get(self):
        super().do_GET()

    def _serve_head(self):
        super().do_HEAD()

    def _dispatch(self, fallback):
        route = self.path.split('?', 1)[0]
        entry = REDIRECTS.get(route)
        if entry is None:
            return fallback()
        destination, status = entry
        if 300 <= status < 400:
            self.send_response(status)
            self.send_header('Location', destination)
            self.send_header('Content-Length', '0')
            self.end_headers()
            return
        self._send_page(status, destination)

    def _send_page(self, status, destination):
        try:
            page = (ROOT / destination.lstrip('/')).read_bytes()
        except OSError:
            return self.send_error(status)
        self.send_response(status)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.send_header('Content-Length', str(len(page)))
        self.end_headers()
        if self.command != 'HEAD':
            self.wfile.write(page)

    def list_directory(self, path):
        self.send_error(404, 'Not Found')
        return None

    def send_error(self, code, message=None, explain=None):
        if code != 404:
            return super().send_error(code, message, explain)
        self._send_page(404, '404.html')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, default=8000)
    parser.add_argument('--directory', type=Path, default=ROOT)
    parser.add_argument('--pages', action='store_true')
    args = parser.parse_args()
    ROOT = args.directory.resolve()
    if not (ROOT / '404.html').is_file():
        parser.error('Selected directory must contain 404.html; build the production site first.')
    REDIRECTS_FILE = ROOT / '_redirects'
    REDIRECTS = {} if args.pages else load_redirects()
    server = ThreadingHTTPServer(('127.0.0.1', args.port), SiteHandler)
    print(f'Preview: http://127.0.0.1:{server.server_port}', flush=True)
    server.serve_forever()
