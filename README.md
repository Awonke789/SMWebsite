# SM Solutions Website

This repository contains the static SM Solutions website and its local CSS, JavaScript, font, image, brochure, and video assets.

## Vercel deployment

Import this repository into Vercel as a static site. Use the repository root as the project root, leave the build command empty, and set the output directory to `.`. The site entry point is `index.html`.

The original package included PHP/server diagnostics and unrelated template files. Those files were excluded from this public static deployment package because Vercel's static hosting does not execute them and publishing diagnostic endpoints publicly would be unsafe.
