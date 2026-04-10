# manna-core.dev Static Site

This folder now holds the simple static site source for `manna-core.dev`.

Main file:

- [index.html](/C:/manna-core/projects/manna-view-mission-site/index.html)
- [styles.css](/C:/manna-core/projects/manna-view-mission-site/styles.css)
- [landscape/index.html](/C:/manna-core/projects/manna-view-mission-site/landscape/index.html)
- [landscape/styles.css](/C:/manna-core/projects/manna-view-mission-site/landscape/styles.css)
- [landscape/brand-mark.svg](/C:/manna-core/projects/manna-view-mission-site/landscape/brand-mark.svg)
- [manna-view/index.html](/C:/manna-core/projects/manna-view-mission-site/manna-view/index.html)
- [.nojekyll](/C:/manna-core/projects/manna-view-mission-site/.nojekyll)

## What It Is For

- serving the root `manna-core.dev` public landing page
- giving the manna ecosystem a simple umbrella site
- exposing a dedicated static `Manna-Landscape` page at `/landscape/`
- keeping deployment easy through GitHub Pages

## Important

This folder is ready to host, but it is only public when deployed through the GitHub Pages repo / custom-domain flow.

Current intended public shape:

- `/` -> `manna-core.dev` umbrella landing page
- `/landscape/` -> `Manna-Landscape` standalone customer-facing service page
- `/manna-view/` -> `Manna-View` project page

## Fastest GitHub Pages Path

1. Create a new public GitHub repository.
Recommended name:
`manna-view-site`

2. Upload these files to the root of that repo:

- `index.html`
- `styles.css`
- `landscape/index.html`
- `landscape/styles.css`
- `landscape/brand-mark.svg`
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

## Clean Repo Structure

```text
manna-view-site/
  landscape/
    index.html
    styles.css
    brand-mark.svg
  manna-view/
    index.html
  index.html
  styles.css
  .nojekyll
  README.md
```
