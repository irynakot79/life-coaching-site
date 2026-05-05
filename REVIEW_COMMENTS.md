# PR #1 — Review comments (ready to paste into GitHub)

Formatted for "Add single comment" on the Files changed tab. Each block points to the file + line and proposes concrete changes. Priority tags: **[P0]** blocking, **[P1]** a11y/SEO, **[P2]** polish/maintenance.

---

## `index.html`

### Line 14 — **[P0] Missing portrait asset**
```html
<img src="images/irina-photo.jpg" alt="Irina Kot portrait" class="hero-image"/>
```
The file `images/irina-photo.jpg` is not committed in this PR (no `images/` directory exists at repo root). The hero will render a broken image on GitHub Pages.

**Please either** commit the portrait file, or point `src` at a checked-in placeholder and add an `onerror` fallback. Also consider a more descriptive alt:
```html
<img src="images/irina-photo.jpg"
     alt="Portrait of Irina Kot, reflective lifestyle practitioner"
     class="hero-image" loading="eager" decoding="async"
     onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'hero-image placeholder'}))"/>
```

### Line 14 — **[P2] `<br>` inside `<h1>` hurts responsive layout**
`<h1>Let yourself be.<br>Say yes to yourself.</h1>` forces a line break on every viewport width. On mobile it creates awkward spacing; on tablet it breaks the natural balance.

**Prefer** a soft break driven by CSS `max-width`:
```html
<h1 class="hero-title">Let yourself be. Say yes to yourself.</h1>
```
```css
.hero-copy h1{max-width:16ch}
```

### Lines 6 / 8 — **[P1] Missing preconnect to Google Fonts**
Current `<link>` loads Google Fonts as blocking CSS. Add above the stylesheet link:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

### Head — **[P1] Missing favicon, Open Graph, canonical**
Shared links on Telegram/Messenger / Twitter will show no preview. Add:
```html
<link rel="canonical" href="https://irynakot79.github.io/life-coaching-site/">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<meta property="og:title" content="Irina Kot — A Garden Where One Can Be">
<meta property="og:description" content="A garden of reflections, conversations, and quiet returns.">
<meta property="og:type" content="website">
<meta property="og:image" content="https://irynakot79.github.io/life-coaching-site/images/irina-photo.jpg">
```

### Line 12 — **[P1] Skip-to-content link missing**
For keyboard / screen-reader users:
```html
<a href="#main" class="skip-link">Skip to content</a>
```
…and give `<main>` `id="main"`.

---

## `garden.html`

### Line 6 / Line 11 — **[P0] Duplicate "Fountain" garden cards**
Two distinct cards with nearly identical names and descriptions:

- L6: `Fountain with Fish — Short reflections, small notes…`
- L11: `Fountain — Short public reflections, notes, and small movements…`

Please remove one (recommended: keep **Fountain with Fish** since "fountain" also appears on `index.html` as a `Ways to enter this garden` card).

### Lines 1–19 — **[P2] Entire page is minified to one line**
This makes blame, review, and future edits painful. Please re-format with one element per line (or run Prettier / `prettier --parser html`). Same applies to `archive.html`.

### Line 15 — **[P2] Inconsistent action tag**
```html
<article class="garden-card">…<span class="card-action">Archive note</span></article>
```
Elsewhere in `archive.html` the same role uses `<p class="card-action">`. Pick one tag (I recommend `<span>` everywhere since it is a label, not a paragraph) and use it consistently.

---

## `archive.html`

### Line 1 — **[P0] Broken `<title>`**
```html
<title>Garden Archive of the garden — Irina Kot</title>
```
Word "garden" is duplicated ("Garden Archive of the garden"). Suggested:
```html
<title>Archive of the Garden — Irina Kot</title>
```

### Line 3 — **[P0] Typo in chip**
```html
<span class="chip">Quiet Quiet Group Room</span>
```
Should be `Quiet Group Room`.

### Line 3 — **[P0] / [P1] Chips look like filters but do nothing**
`<span>` with rounded-pill styling reads to sighted users as interactive, and to screen readers as plain text. Either:

1. Implement real filtering (add `data-category="sessions"` on cards + `<button class="chip" aria-pressed="false" data-filter="sessions">`), **or**
2. Reclassify them as a pass­ive legend: rename class to `.chip-legend`, reduce contrast of the border, drop hover state.

### Line 4 — **[P0] Duplicate category/label on Quiet Group Room card**
```html
<p class="card-label">Quiet Group Room</p>
<p class="card-meta">Quiet Group Room</p>
```
Both `card-label` and `card-meta` are identical. `card-label` should be the *type* ("Group"), `card-meta` the *area* ("Sessions" or "Quiet Group Room").

### Line 4 — **[P1] Semantics: `<p>` used as labels/metadata**
Each archive card opens with two `<p>` elements used as tags:
```html
<p class="card-label">Text</p>
<p class="card-meta">Ocean Gazebo</p>
```
These are not paragraphs. Screen readers will announce "paragraph: Text". Prefer `<span>` (block-styled via CSS) or `<small>`. Same issue across the whole archive grid.

### Line 4 (CSS dependency) — **[P0] Dead CSS targets**
`styles.css` defines `.archive-card .meta` and `.archive-card .meta span`, but the HTML uses `.card-meta`. The selectors match nothing. Either rename the HTML class to `.meta` or update CSS to `.card-meta`. See CSS notes below.

---

## `agent.html`

### Line 43 — **[P0] Inconsistent footer branding**
```html
<footer>© 2026 Irina Kot — Reflective Lifestyle Practice</footer>
```
`index.html`, `garden.html`, `archive.html` all say **"A Garden Where One Can Be"**. Only `agent.html`, `works/video-reflection-template.html`, and `works/when-duty-replaces-desire.html` say **"Reflective Lifestyle Practice"**. Pick one tagline and apply everywhere.

### Lines 25–26 — **[P2] Paragraph break merged**
```html
<p>A future guide for the garden.
A quiet digital guide is being prepared…</p>
```
Line 25 is a full sentence; collapsing it into one `<p>` loses visual rhythm. Split into two paragraphs.

### Section order — **[P1] h1→list without h2**
Agent hero has an `<h1>` followed directly by a bullet list of topics. Add an `<h2>` like *"What it will help with"* before the list, to preserve heading hierarchy.

---

## `styles.css`

### Line 31 — **[P1] `.btn-soft` fails WCAG AA contrast**
```css
.btn-soft{background:#76736e}
```
`#76736e` + `#ffffff` text = **~4.35:1**. Bump to at least `#6a6763` (≥ 4.6:1).

### Line 17 — **[P1] `.site-nav a` borderline contrast + no focus style**
`color: var(--muted)` (#6f6b66) on page background is ~4.9:1 — okay but weak. More importantly, no `:focus-visible` declared anywhere. Add:
```css
.btn:focus-visible,
.site-nav a:focus-visible,
.text-link:focus-visible,
.card-action-link:focus-visible{
  outline:2px solid var(--text); outline-offset:3px;
}
```

### Line 16 — **[P1] Nav overflows on narrow screens**
```css
.site-nav{max-width:1180px;margin:0 auto;display:flex;gap:1rem}
```
5 links + pill padding overflow horizontally below ~380px. Add `flex-wrap:wrap; row-gap:.4rem`.

### No rule — **[P1] `[aria-current="page"]` has no visual indicator**
HTML sets `aria-current="page"` on the active nav link, but CSS doesn't style it. Add:
```css
.site-nav a[aria-current="page"]{
  background:var(--surface); color:var(--text); font-weight:500;
}
```

### Line 39 — **[P0] Selector `.archive-head h1` doesn't match**
HTML uses `class="section-card archive-hero"`. The `.archive-head` selector is never matched, so the archive `h1` falls back to default sizing. Rename to:
```css
.archive-hero h1{font-size:clamp(2rem,4vw,3rem);margin-bottom:.6rem}
```

### Lines 45–46 — **[P0] Dead selectors `.archive-card .meta`**
HTML uses `.card-meta`. Either rename classes or update selectors:
```css
.archive-card .card-meta{font-size:.83rem;color:var(--muted);margin-bottom:.4rem}
```

### Lines 62, 64 — **[P2] Empty CSS rules**
```css
.nav-link{}
.entry-card{}
```
Remove; they provide no styling.

### Missing rules — **[P1]**
`.garden-grid`, `.garden-card`, `.garden-hero`, `.archive-page` are referenced from HTML but not styled. The garden page falls back to default `<article>` layout (single column, no spacing). Add:
```css
.garden-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:.9rem}
.garden-card{background:var(--surface-light);border:1px solid var(--border);padding:1rem}
.garden-card h3{font-size:1.2rem;margin-bottom:.4rem}
.garden-hero h1{font-size:clamp(2rem,4vw,3rem);margin-bottom:.5rem}
```

---

## `works/live-reflection-template.html` + `works/video-reflection-template.html`

### Single-line minified — **[P2]**
Re-format same as `archive.html` / `garden.html`.

### `<meta name="robots" content="noindex, follow">` — **[P1]**
These are template pages labelled "Future / being prepared". They should not be indexed by search engines until real content ships.

### Footer consistency — **[P0]**
`video-reflection-template.html` ends with "Reflective Lifestyle Practice" while `live-reflection-template.html` and `when-duty-replaces-desire.html` mix both taglines. Unify.

---

## `CONTENT_GUIDE.md`

### **[P2] Add a pre-publish checklist**
Consider adding:
```
## Before publishing
1. Validate HTML: https://validator.w3.org/
2. Run Lighthouse (a11y + SEO ≥ 95).
3. Confirm no duplicate card labels and no `garden` duplicates.
4. Confirm footer tagline matches across all pages.
```

---

## Summary

**P0 blockers:** missing portrait asset; duplicate Fountain card; typo "Quiet Quiet Group Room"; broken `archive.html` title; dead CSS selectors (`archive-head`, `.meta`); inconsistent footer branding; duplicate category on Quiet Group Room card.

**P1 (a11y / SEO):** contrast of `.btn-soft` and `--muted`; missing `:focus-visible`; missing `[aria-current]` styling; nav wrap on mobile; missing favicon / OG / canonical; skip-link; `<p>` mis-used as label; template pages without `noindex`; missing styles for `.garden-*`.

**P2 (polish):** minified HTML files; empty `.nav-link`/`.entry-card`; `<br>` inside `<h1>`; unify `<span>` vs `<p>` for `.card-action`; split merged paragraph in `agent.html`.
