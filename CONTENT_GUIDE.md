# Content Publishing Guide

## GitHub Pages model
This website is static. There is no admin dashboard yet.
To publish new materials, add or edit HTML files and update `archive.html` links/cards.

## How to add a text reflection
1. Create a new file in `works/` (for example `works/my-reflection.html`).
2. Use the same navigation/header/footer structure.
3. Add title, preface, and body text.
4. Add or update a card in `archive.html` linking to this page.

## How to add a letter
1. Create a new letter page in `works/` or publish as an archive note.
2. Keep tone intimate, clear, and non-clinical.
3. Update `archive.html` with category, theme, and action text.

## How to add a video reflection
1. Create or update a page in `works/` with written preface and context.
2. Host video externally first (YouTube, Vimeo, or approved host).
3. Paste approved embed code in the video area section.
4. Update the archive card to point to the page.

## How to add a live announcement
1. Add a new archive card in `archive.html`.
2. Include date/time/context and access instructions or a mailto interest link.
3. Keep live entries clearly marked as upcoming/future until confirmed.

## How to update archive cards
- Edit the card list in `archive.html`.
- Keep card type, category, title, description, and clear action text.
- Avoid placeholders and unfinished links.

## Why videos should be hosted externally
GitHub Pages is static and not a media streaming backend. External video hosts provide reliable playback and bandwidth handling.

## Why API keys and AI backends must not be in browser code
Client-side code is public. API keys must never be exposed in static HTML/JS.
For a real AI guide, use a secure backend or approved third-party widget with server-side key management.

## How to add a new garden area later
1. Add a new area card to `garden.html`.
2. Add corresponding category chips/cards to `archive.html`.
3. If needed, create a new page in `works/` and link it from archive cards.
