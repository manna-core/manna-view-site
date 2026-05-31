# Website

This folder holds the static GitHub Pages source for `manna-core.dev`.

Main files:

- [index.html](/D:/Manna-core/projects/Website/index.html)
- [styles.css](/D:/Manna-core/projects/Website/styles.css)
- [favicon.svg](/D:/Manna-core/projects/Website/favicon.svg)
- [assets/manna-core-operator-hero.png](/D:/Manna-core/projects/Website/assets/manna-core-operator-hero.png)
- [projects/index.html](/D:/Manna-core/projects/Website/projects/index.html)
- [projects/manna-minecraft-builder/index.html](/D:/Manna-core/projects/Website/projects/manna-minecraft-builder/index.html)
- [projects/deep-delvers/index.html](/D:/Manna-core/projects/Website/projects/deep-delvers/index.html)
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
- exposing a dedicated shared `Projects` hub at `/projects/`
- exposing a detailed `Manna Minecraft Builder` profile at `/projects/manna-minecraft-builder/`
- exposing a detailed `Deep Delvers` project profile at `/projects/deep-delvers/`
- exposing a dedicated static `Manna-Landscape` page at `/landscape/`
- keeping deployment easy through GitHub Pages

## Important

This folder is ready to host through the GitHub Pages repo / custom-domain flow.

Current publish target:

- GitHub repo: `manna-core/manna-view-site`
- Branch: `main`
- Custom domain: `manna-core.dev`

Landscape asset organization:

- `landscape/branding/` is where branding icons, marks, and related visual identity files should go
- `landscape/photos/` is where public job-photo references for the site gallery should go

Current intended public shape:

- `/` -> `manna-core.dev` umbrella landing page
- `/projects/` -> project network hub for interesting active builds
- `/projects/manna-minecraft-builder/` -> detailed public-facing `Manna Minecraft Builder` profile
- `/projects/deep-delvers/` -> detailed public-facing `Deep Delvers` profile
- `/landscape/` -> `Manna-Landscape` standalone customer-facing service page
- `/manna-view/` -> `Manna-View` project page

## Publish Flow

1. Edit the static files locally.
2. Verify local references and render the key pages with Edge or a browser.
3. Commit and push to `manna-core/manna-view-site` on `main`.
4. Wait for GitHub Pages to publish.
5. Verify the live custom domain on desktop and mobile.

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
  assets/
    manna-core-operator-hero.png
  projects/
    manna-minecraft-builder/
      index.html
    deep-delvers/
      index.html
    index.html
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
  favicon.svg
  .nojekyll
  README.md
```
