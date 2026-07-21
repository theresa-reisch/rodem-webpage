# RODEM group website

A plain static website — HTML, CSS and a little JavaScript. There is no build
step, no framework and nothing to install. Open `index.html` in a browser and it
works.

## Files

```
index.html            Home: intro, research themes, team, latest news, contact
publications.html     Full publication list
news.html             Full news list
assets/css/style.css  All styling (colours are set at the top)
assets/js/content.js  <- EDIT THIS: team, news, publications, contact details
assets/js/render.js   Turns content.js into the page. No need to touch.
images/team/          Member photos go here
```

## How to edit the site

**Team members, news items, publications, contact details**
→ edit `assets/js/content.js`. Everything is commented; copy an existing entry
and change the values. Keep the commas and quotes as they are.

**Intro paragraph and the four research cards**
→ edit `index.html` directly. Look for the `<!-- RESEARCH -->` comment banner.
These live in the HTML (not `content.js`) so that search engines index them.

**Colours and fonts**
→ edit the `:root` block at the top of `assets/css/style.css`. Change
`--accent` to change the highlight colour across the whole site. A dark-mode
palette is right below it and applies automatically for visitors whose system
is set to dark.

### Adding a photo

1. Put a square image (about 600×600 px) in `images/team/`.
2. In `content.js`, set that person's `photo` field:
   `photo: "images/team/tobias-golling.jpg",`

Members without a photo show a circle with their initials, so the page always
looks complete.

## Previewing locally

Just double-click `index.html` — it opens in your browser and everything works,
including the team and publication lists.

If you prefer a local server:

```bash
python3 -m http.server 8000     # then open http://localhost:8000
```

## Publishing on GitHub Pages

1. Create a new repository on GitHub — for a group site, `rodem-hep.github.io`
   gives you the cleanest URL.
2. Push these files to it:

   ```bash
   cd /home/theresa/webpage
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<org-or-user>/<repo>.git
   git push -u origin main
   ```

3. On GitHub: **Settings → Pages → Source: Deploy from a branch**, choose
   `main` and folder `/ (root)`. Save.
4. Wait a minute, then visit the URL GitHub shows you.

Every later `git push` updates the live site automatically.

The `.nojekyll` file tells GitHub Pages to publish the files as-is rather than
running them through Jekyll. Leave it in place.

## Still to do

- [ ] Check the team list — it was taken from the old DPNC page and may be out of date
- [ ] Rewrite the four research cards in `index.html` in the group's own words
- [ ] Replace the example publications with real ones (or link to INSPIRE-HEP instead)
- [ ] Replace the example news items
- [ ] Add member photos
- [ ] Confirm what RODEM stands for (`groupFull` in `content.js` is a guess)
