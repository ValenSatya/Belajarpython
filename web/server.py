"""
Server Lokal Web Learning Portal LKS AI (Zero-Dependency)
Menggunakan modul bawaan Python (http.server, subprocess, json, urllib).
Mendukung live execution script Python langsung dari browser!
"""

import os
import sys
import json
import subprocess
import urllib.parse
from http.server import HTTPServer, SimpleHTTPRequestHandler

# Pastikan encoding stdout mendukung UTF-8 di Windows
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

PORT = 8000
WORKSPACE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
WEB_DIR = os.path.dirname(os.path.abspath(__file__))

class LKSAIHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=WEB_DIR, **kwargs)

    def do_GET(self):
        parsed_url = urllib.parse.urlparse(self.path)
        path = parsed_url.path
        query = urllib.parse.parse_qs(parsed_url.query)

        # API: Mengambil isi file kode atau markdown
        if path == "/api/file":
            file_rel = query.get("path", [""])[0]
            target_path = os.path.abspath(os.path.join(WORKSPACE_DIR, file_rel))

            # Keamanan: pastikan file berada di dalam WORKSPACE_DIR
            if not target_path.startswith(WORKSPACE_DIR) or not os.path.exists(target_path):
                self.send_response(404)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": "File tidak ditemukan"}).encode("utf-8"))
                return

            try:
                with open(target_path, "r", encoding="utf-8") as f:
                    content = f.read()
                self.send_response(200)
                self.send_header("Content-Type", "text/plain; charset=utf-8")
                self.end_headers()
                self.wfile.write(content.encode("utf-8"))
            except Exception as e:
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))
            return

        # Default serve static file
        return super().do_GET()

    def do_POST(self):
        parsed_url = urllib.parse.urlparse(self.path)
        path = parsed_url.path

        # API: Menjalankan skrip Python lokal secara real-time
        if path == "/api/run":
            content_length = int(self.headers.get("Content-Length", 0))
            post_data = self.rfile.read(content_length)

            try:
                data = json.loads(post_data.decode("utf-8"))
            except Exception:
                data = {}

            script_rel = data.get("script")
            custom_code = data.get("code")

            temp_file = None
            if custom_code:
                temp_file = os.path.join(WORKSPACE_DIR, "_temp_run.py")
                with open(temp_file, "w", encoding="utf-8") as f:
                    f.write(custom_code)
                target_exec = temp_file
            elif script_rel:
                target_exec = os.path.abspath(os.path.join(WORKSPACE_DIR, script_rel))
            else:
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": "Harus menyertakan 'script' atau 'code'"}).encode("utf-8"))
                return

            cmd = ["py", target_exec]
            try:
                proc = subprocess.run(
                    cmd,
                    cwd=WORKSPACE_DIR,
                    stdout=subprocess.PIPE,
                    stderr=subprocess.PIPE,
                    text=True,
                    timeout=30,
                    encoding="utf-8",
                    errors="replace"
                )
                output = proc.stdout
                error = proc.stderr
                exit_code = proc.returncode
            except subprocess.TimeoutExpired:
                output = ""
                error = "[ERROR] Eksekusi timeout (lebih dari 30 detik)."
                exit_code = -1
            except Exception as e:
                output = ""
                error = f"[ERROR] Gagal mengeksekusi python: {str(e)}"
                exit_code = -1
            finally:
                if temp_file and os.path.exists(temp_file):
                    try:
                        os.remove(temp_file)
                    except Exception:
                        pass

            response_data = {
                "stdout": output,
                "stderr": error,
                "exit_code": exit_code
            }

            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            self.wfile.write(json.dumps(response_data).encode("utf-8"))
            return

        return super().do_POST()


def start_server():
    server_address = ("", PORT)
    try:
        httpd = HTTPServer(server_address, LKSAIHandler)
    except OSError:
        httpd = HTTPServer(("", 8080), LKSAIHandler)
        print("Port 8000 terpakai, beralih ke port 8080...")

    active_port = httpd.server_port
    url = f"http://localhost:{active_port}"

    print("=" * 60)
    print(">>> LKS AI Learning Portal Server Aktif! <<<")
    print(f"URL: {url}")
    print(f"Direktori Modul: {WORKSPACE_DIR}")
    print("Tekan Ctrl+C untuk mematikan server.")
    print("=" * 60)

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nMematikan server...")
        httpd.server_close()


if __name__ == "__main__":
    start_server()
