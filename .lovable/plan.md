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

## Not included
No email automation, AI, paid services, subscriptions or third-party accounts. No publishing.

## Verification
- Build succeeds.
- Submit a test inquiry; confirm it appears in the admin page and status changes save.
- Compare homepage screenshots before/after to confirm it is visually unchanged apart from the new Phone field.

## Technical details
- Table `public.leads` with enums `lead_status`, `lead_priority`; GRANT INSERT to `anon`/`authenticated` (insert-only policy forcing default status/priority), SELECT/UPDATE only via `has_role(auth.uid(),'admin')`.
- `user_roles` table + `app_role` enum + `has_role` security-definer function per standard pattern.
- Client-side zod validation with length limits; DB column length checks.
- Existing `fetch` to the external `smart-api` endpoint and its payload kept byte-identical; Cloud insert runs alongside it.
- New routes `/admin` (login + list) added above the catch-all in `App.tsx`.
