# Security Policy — VVC Pitchtool (`pitch.vvc.works`)

## Ondersteunde Versies
Alleen de actuele productie-branch (`master`) wordt actief ondersteund met beveiligingsupdates.

## Kwetsbaarheden Melden (Responsible Disclosure)
Meld beveiligingsproblemen **nooit** via publieke GitHub Issues. Neem direct vertrouwelijk contact op via:
- **Security Contact:** `info@jamaldrenthe.com`
- **Onderwerp:** `[SECURITY][VVC-PITCH] Beschrijving kwetsbaarheid`

## Herstel-SLA Baseline
- **P0 (Critical):** 24 – 48 uur
- **P1 (High):** 7 dagen
- **P2 (Medium):** 30 dagen
- **P3 (Low):** 90 dagen

## Architecturale Beveiligingseisen
- AI-verzoeken lopen uitsluitend server-side via Cloudflare Pages Functions (`/api/chat`) met `GEMINI_API_KEY` als encrypted secret.
- Authenticatie vindt plaats via Firebase Auth (geen client-side bypasses of hardcoded demo-credentials).
- Cross-subdomain SSO tokens worden uitsluitend via URL hash fragments (`#sso_token=...`) uitgewisseld en direct geschoond.
