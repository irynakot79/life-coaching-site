#!/usr/bin/env bash
# Simple preview helper for the static site.
# Usage:
#   ./preview.sh            # starts on port 8765
#   ./preview.sh 4321       # starts on custom port
set -e
PORT="${1:-8765}"
cd "$(dirname "$0")"

# Pick whichever is available
if command -v python3 >/dev/null 2>&1; then
  CMD="python3 -m http.server ${PORT}"
elif command -v python >/dev/null 2>&1; then
  CMD="python -m http.server ${PORT}"
elif command -v npx >/dev/null 2>&1; then
  CMD="npx --yes serve -l ${PORT} ."
else
  echo "Need python3 or Node.js (npx) to run a local server."
  exit 1
fi

echo ""
echo "  Irina's Garden — local preview"
echo "  ——————————————————————————————"
echo "  Open in browser:"
echo "    http://localhost:${PORT}"
echo ""
echo "  Press Ctrl+C to stop."
echo ""
exec $CMD
