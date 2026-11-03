# International Alignment isolated display contract — stage 1

Adds a **standalone read-only adapter** for five spheres × four years of original-source UNGA recorded-vote agreement. It provides validated percentages and underlying numerators/denominators for a future separate descriptive display, but it **cannot** operate the existing influence needle or feed the weighted influence model.

The adapter deliberately does **not** modify `chaos-dashboard.js`, `chaos-meter-model.js`, `chaos-meter-data.js`, `index.html`, category selectors, existing diplomatic evidence, or any CSS. The existing live meter is unaffected. Its validation requires the original-source schema, frozen 160 external partners, no influence score, no authorized needle, complete four-year series, and percentage-to-count consistency.

Next UI PR: render a clearly separated International Alignment table and optional percent-only graphic inside the existing evidence panel, with source links and EU threshold caveats; never replace a reviewed influence dial with a voting percentage or silently rename the legacy Diplomatic data keys. Test mobile and desktop layouts and selectors before merge.
