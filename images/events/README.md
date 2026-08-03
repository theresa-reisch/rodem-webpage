# Workshop photographs

One group photograph per workshop, referenced from `image:` in `EVENTS`
(`assets/js/content.js`) and shown at the bottom of that workshop's entry on
`output.html#workshops`.

Keep them **web-sized**: 1400px on the long edge, JPEG quality ~82, which lands
around 400 kB. Phone originals are 4–6 MB each and would make the page slower
than the rest of the site put together. The originals live wherever you keep
photographs — not in this repository.

    python3 - <<'EOF'
    from PIL import Image
    im = Image.open("IMG_1234.jpg").convert("RGB")
    im = im.resize((1400, round(im.height * 1400 / im.width)), Image.LANCZOS)
    im.save("images/events/boninchi-2027.jpg", quality=82, optimize=True, progressive=True)
    EOF

Every photograph needs an `imageAlt:` line next to it saying what it shows, and
anyone recognisable in one should be happy to be on a public page.

The wide crop of the 2025 photograph is used as the group picture above the team
grid on the home page; it lives in `images/team/group-boninchi-2025.jpg`.
