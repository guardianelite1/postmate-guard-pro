# Fix the published Guardian Elite logo

## Changes
- Copy the exact uploaded transparent logo, byte-for-byte, into the site’s public assets.
- Point the existing shared logo reference to that production-safe public path so the header, homepage, and footer use the same file.
- Remove the environment-specific preview/CDN workaround that causes the custom-domain 404.

## Verification
- Confirm the copied file matches the uploaded original exactly.
- Check desktop and mobile rendering in the preview, including header and footer.
- Confirm the production build contains the logo at the expected root URL and has no new errors.

## Scope
No layout, copy, colors, forms, navigation, SEO, integrations, or business logic will change.
