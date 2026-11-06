# Muudhi Portfolio

Pure HTML5, CSS3 and vanilla ES6+ JavaScript. No build step, no dependencies.

## Run locally
Open `index.html` in a browser, or serve the folder:

    python3 -m http.server 8000   # then visit http://localhost:8000

## Edit your content
Everything on the page comes from `js/data.js`. Search for `TODO` there:

- `TODO(verify)` marks sample copy from the design mock. Replace or delete it.
- Empty URL fields (`liveUrl`, `credentialUrl`) are skipped, so no dead buttons appear.

## Add your own files to `assets/`
- `Mohamuud_Nuur_Abdullahi_CV.pdf` (the Download buttons point here)
- A portrait photo, then change the `src` of `.hero-image` in `index.html`

## Deploy
Upload the folder as-is to Netlify, Vercel, GitHub Pages or any static host.

## Structure
    index.html
    css/main.css          tokens, reset, base, layout
    css/components.css    nav, buttons, cards, modal, form, footer
    css/responsive.css    breakpoints: 320, 768, 1024, 1440
    js/data.js            content store
    js/theme.js           theme toggle + localStorage
    js/main.js            rendering, drawer, scroll-spy, CV dialog, form validation
