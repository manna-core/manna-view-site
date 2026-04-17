# Website

This folder now holds the simple static site source for `manna-core.dev`.

Main file:

- [index.html](/D:/Manna-core/projects/Website/index.html)
- [styles.css](/D:/Manna-core/projects/Website/styles.css)
- [landscape/index.html](/D:/Manna-core/projects/Website/landscape/index.html)
- [landscape/styles.css](/D:/Manna-core/projects/Website/landscape/styles.css)
- [landscape/brand-mark.svg](/D:/Manna-core/projects/Website/landscape/brand-mark.svg)
- [landscape/logo-mark.png](/D:/Manna-core/projects/Website/landscape/logo-mark.png)
- [landscape/thanks.html](/D:/Manna-core/projects/Website/landscape/thanks.html)
- [landscape/branding](/D:/Manna-core/projects/Website/landscape/branding)
- [landscape/photos](/D:/Manna-core/projects/Website/landscape/photos)
- [manna-view/index.html](/D:/Manna-core/projects/Website/manna-view/index.html)
- [.nojekyll](/D:/Manna-core/projects/Website/.nojekyll)

## What It Is For

- serving the root `manna-core.dev` public landing page
- giving the manna ecosystem a simple umbrella site
- exposing a dedicated static `Manna-Landscape` page at `/landscape/`
- keeping deployment easy through GitHub Pages

## Important

This folder is ready to host, but it is only public when deployed through the GitHub Pages repo / custom-domain flow.

Landscape asset organization:

- `landscape/branding/` is where branding icons, marks, and related visual identity files should go
- `landscape/photos/` is where public job-photo references for the site gallery should go

Current intended public shape:

- `/` -> `manna-core.dev` umbrella landing page
- `/landscape/` -> `Manna-Landscape` standalone customer-facing service page
- `/manna-view/` -> `Manna-View` project page

## Fastest GitHub Pages Path

1. Create a new public GitHub repository.
Recommended repo name:
`website`

2. Upload these files to the root of that repo:

- `index.html`
- `styles.css`
- `landscape/index.html`
- `landscape/styles.css`
- `landscape/brand-mark.svg`
- `landscape/logo-mark.png`
- `landscape/thanks.html`
- `manna-view/index.html`
- `.nojekyll`

3. In GitHub, open:
`Settings -> Pages`

4. Under `Build and deployment`:

- `Source`: `Deploy from a branch`
- `Branch`: `main`
- `Folder`: `/ (root)`

5. Save.

6. Wait for GitHub Pages to publish.

7. Your site URL will usually look like:
`https://<your-github-username>.github.io/manna-view-site/`

8. Point the custom domain at that Pages site as already done for `manna-core.dev`.

## Deployment Note

Because this folder now acts like the root-site source, keep paths relative and static-host friendly.

The quote-request form on the landscape page is wired for FormSubmit:

- form action: `https://formsubmit.co/landscape@manna-core.dev`
- inbox target: `landscape@manna-core.dev`
- thank-you page: `/landscape/thanks.html`

Important first-live step:

- the first real submission to a new FormSubmit target will trigger an email asking you to confirm and activate forwarding
- after that confirmation step, future quote requests should route automatically

## Clean Repo Structure

```text
website/
  landscape/
    index.html
    styles.css
    brand-mark.svg
    logo-mark.png
    thanks.html
    branding/
    photos/
  manna-view/
    index.html
  index.html
  styles.css
  .nojekyll
  README.md
```
