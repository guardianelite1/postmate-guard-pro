# Lead intake and lead management (foundation)

## What exists today
- The consultation form already collects name, company, email, advisory type and message, and sends them to an existing outside endpoint (your current lead delivery). This stays exactly as it is.
- Lovable Cloud (built-in database and sign-in) is already turned on for this project but is empty: no tables, no sign-in, no admin accounts. Nothing external needs to be added.

## Website changes (form only)
- Add one field to the existing form: **Phone** (optional), styled like the other fields.
- Keep the existing "advisory type" dropdown as the **Service needed** field (same three options, same tailored thank-you messages).
- On submit, the form keeps sending to the existing endpoint unchanged, and also saves a lead record in the database. If one of the two fails, the visitor still sees the normal confirmation as long as the other succeeds.
- No other homepage changes: logo, colors, hero, navigation, sections and copy untouched.

## Lead record
Each submission stores: unique lead ID, date/time received, full name, company, email, phone, service requested, original message, status (starts **New**), priority (starts **Normal**), internal notes (empty), next action (empty).

## Internal lead-management page
- New private page at `/admin` (not linked from the public site).
- Sign-in with email and password. Only accounts marked as **admin** can see leads; everyone else is blocked.
- Table of leads, newest first: received date, name, company, contact, service, status, priority.
- Click a lead to see the full message and edit status (New, Contacted, Follow-Up, Proposal, Won, Closed), priority (Low, Normal, High), internal notes and next action.
- Simple filter by status.
- After you create your account on the sign-in page, I mark it as admin.

## AI-assisted lead analysis (foundation)
Each lead gets an "AI analysis" area on its detail page showing:
- Summary of the request
- Detected service
- Suggested priority (Low, Normal, High)
- Suggested next action
- Key concerns or requirements
- When it was analyzed, plus an analysis status (Not analyzed, Analyzed, Failed)

Suggestions never overwrite your own fields. A "Use suggestion" button copies the suggested priority or next action into the lead, but only when you click it.

**What's available:** this project already includes Lovable's built-in AI. It needs no outside account, API key or subscription and nothing to sign up for. It comes with a small free monthly allowance. Usage beyond that allowance needs a paid Lovable plan, so it isn't strictly free forever.

To respect your "no paid AI" rule, the plan builds this in two layers:
1. **Built now:** all the AI fields above, the analysis area on the lead page, and the "Use suggestion" buttons. Everything works without AI; the area just says "Not analyzed yet."
2. **Built in, turned off by default:** an "Analyze with AI" button that uses the built-in AI, one lead at a time, only when you click it. Nothing runs automatically. It stays hidden until you say to switch it on. If you'd rather leave it out entirely, I'll build layer 1 only.

## Not included
No email or text automation, external or paid AI accounts, subscriptions or third-party services. AI never runs automatically. No publishing, and no changes to the GitHub connection or repository layout.


## Verification
- Build succeeds.
- Submit a test inquiry; confirm it appears in the admin page and status changes save.
- Compare homepage screenshots before/after to confirm it is visually unchanged apart from the new Phone field.

## Technical details
- Table `public.leads` with enums `lead_status`, `lead_priority`; GRANT INSERT to `anon`/`authenticated` (insert-only policy forcing default status/priority), SELECT/UPDATE only via `has_role(auth.uid(),'admin')`.
- AI columns on `leads` (all nullable): `ai_summary`, `ai_service`, `ai_suggested_priority` (lead_priority), `ai_next_action`, `ai_key_concerns` (text[]), `ai_status` enum (`not_analyzed` default, `analyzed`, `failed`), `ai_analyzed_at`, `ai_error`. Public inserts cannot set these fields.
- Layer 2: edge function `analyze-lead` that checks the caller is an admin, calls the Lovable AI Gateway (`openai/gpt-6-astra`, Responses API, structured output, streamed) with server-held `LOVABLE_API_KEY`, and writes results. It shows 402/429 errors to you and never retries automatically. A UI flag keeps the button hidden until you enable it.
- `user_roles` table + `app_role` enum + `has_role` security-definer function per standard pattern.
- Client-side zod validation with length limits; DB column length checks.
- Existing `fetch` to the external `smart-api` endpoint and its payload kept byte-identical; Cloud insert runs alongside it.
- New routes `/admin` (login + list) added above the catch-all in `App.tsx`.
