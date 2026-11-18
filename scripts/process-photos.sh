#!/usr/bin/env bash
# Converts source photos in design-assets/ to web-ready WebP in public/.
# EXIF and other metadata are dropped (cwebp default). The class photo is deliberately skipped.
set -euo pipefail
cd "$(dirname "$0")/.."
SRC=design-assets; mkdir -p public/photos public/art
landscape() { cwebp -quiet -q 72 -resize 1200 0 "$SRC/photos/$1" -o "public/photos/${1%.*}.webp"; }
portrait()  { cwebp -quiet -q 72 -resize 0 1200 "$SRC/photos/$1" -o "public/photos/${1%.*}.webp"; }
portrait childhood-with-mom.jpg
landscape family.jpg
portrait srm-campus.jpg
landscape prism-lab-2.jpg
landscape infosys-team-steps.jpg
cwebp -quiet -q 80 -resize 1400 0 "$SRC/photos/prism-certificate.png" -o public/photos/prism-certificate.webp
cwebp -quiet -q 80 -resize 1024 0 "$SRC/art/crew-canteen.png" -o public/art/crew-canteen.webp
