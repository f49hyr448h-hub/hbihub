# XBIHUB Official Website — V1.1 Netlify Upgrade

This package is based on the supplied `xbihub-official-website` source. It preserves the public marketing pages and adds a server-backed partner portal at `secure.html`, Netlify Functions, and a Supabase schema.

## Security status

- Removed the hard-coded `admin@xbihub.com / admin` login path from the served login page.
- Legacy `login.html`, `apply.html`, `portal.html`, and `admin.html` now redirect to `secure.html`; they no longer run the old client-side demo authentication.
- Disabled demo-data seeding in the public site's legacy JavaScript.
- Secure portal identity is derived server-side from a Supabase Auth token in a Secure, HttpOnly, SameSite=Lax cookie.
- No administrator is auto-created. Public registration always creates the `applicant` role.
- Administrator role must be assigned manually by a trusted Supabase project owner.
- Service-role credentials are only read by Netlify Functions and must never be put into HTML/JS.
- E-signature actions fail closed until a real provider integration and verified callback are implemented.
- Node activation fails closed unless a provider-verified signed agreement, payment confirmation and training completion are present.

**Important:** this code package does not remotely disable credentials in the live Netlify deployment. Deploying it is required to remove the old demo login from the live website. Rotate any credentials that may have been exposed.

## Stack

- Existing static HTML/CSS/JS public website
- Netlify static hosting + Netlify Functions
- Supabase Auth + Postgres
- Optional Resend email notifications (status notices only, requires a verified sender)
- E-signature provider: not connected in this package; select and configure DocuSign/Adobe Acrobat Sign, then implement and test provider API + webhook verification before real signing.

## Deploy on Netlify

### 1. Back up and inspect
1. Download a backup of the currently deployed site and preserve the current deploy.
2. Use a separate Netlify deploy preview or staging site first.
3. Do not delete the current site or database.

### 2. Create Supabase project
1. Create a Supabase project under an XBIO-controlled account.
2. In Supabase SQL Editor, run `supabase/schema.sql`.
3. Copy Project URL and the public anon key.
4. Copy the service-role key only into Netlify environment variables. Never share it in chat or commit it to Git.
5. In Authentication settings, configure allowed redirect URLs and email verification for the XBIHUB production domain.
6. Configure SMTP for reliable production verification email. Supabase's default email service is not intended for unrestricted production volume.

### 3. Configure Netlify environment
Netlify → Site configuration → Environment variables. Add:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ALLOWED_ORIGINS=https://xbihub.com,https://www.xbihub.com`
- `URL=https://xbihub.com`

Optional status email:
- `RESEND_API_KEY`
- `MAIL_FROM=XBIHUB <verified-sender@your-domain.com>`

Never set these in frontend variables prefixed `VITE_`, `NEXT_PUBLIC_`, or embed them in JS. Netlify Functions must be enabled.

### 4. Deploy to a staging site first
1. Commit the contents of the `xbihub/` directory to the XBIO-controlled repository, including `netlify.toml`, `netlify/functions/api.mjs`, and `supabase/schema.sql`.
2. In Netlify, connect the correct repository and set the publish directory to `.` and functions directory to `netlify/functions` (already in `netlify.toml`).
3. Deploy a staging/branch preview.
4. Open `/.netlify/functions/api` with POST action `health` using a test client, or visit the portal and confirm it reports configuration readiness. Do not test with real partner data yet.

### 5. Assign the first administrator
After registering and verifying the intended administrator account, use Supabase SQL Editor and replace the address:
```sql
update public.profiles
set role = 'admin'
where email = 'your-controlled-admin@example.com';
```
Confirm exactly one row was updated. Do not promote an email before the account is verified and controlled by XBIO.

### 6. Test the complete supported flow
- Register a test partner using a controlled mailbox.
- Verify email and sign in.
- Submit a node application with a plan of 50+ characters.
- Sign in as the separately provisioned administrator.
- Review / approve / request information / reject and confirm server-side status changes.
- Configure Resend and verify status notifications, if required.
- Publish a test resource and confirm the intended access level.
- Confirm activation is blocked unless a signed agreement has `provider_verified=true`, and both `payment_confirmed` and `training_completed` are true.
- Check Netlify Function logs and Supabase audit records.
- Test a second account cannot read another user's applications.
- Test applicant cannot invoke admin actions.
- Test API calls with no cookie, expired token, malformed JSON, invalid status and oversized fields.

### 7. Production electronic signatures — still required
Do not use a typed-name button or admin checkbox as a legally meaningful e-signature. Select a provider and complete a dedicated integration that:
1. creates an envelope from an approved, versioned agreement template;
2. routes it to the verified authorized signer(s);
3. validates webhook signatures / JWTs per provider documentation;
4. queries the provider's API to verify envelope completion (do not trust an unverified browser callback);
5. downloads and archives the signed PDF and certificate/audit trail in a private storage bucket;
6. writes `provider`, `provider_envelope_id`, `signed_at`, `signed_document_path`, and `provider_verified=true` only after verification;
7. handles declined, voided, expired, resend, duplicate callbacks and version changes.
The API intentionally returns HTTP 503 for agreement send/sign until this provider integration exists.

### 8. Email notifications
The optional Resend code sends application status notices only if both `RESEND_API_KEY` and `MAIL_FROM` are configured. Verify the sending domain with Resend first. Registration verification is handled by Supabase Auth and its SMTP settings.

## Current feature status

| Feature | Status |
|---|---|
| Existing public site pages and styling | Preserved |
| Hard-coded demo admin login | Removed from login path |
| Client-side demo data seeding | Disabled |
| Server-backed registration/login/session | Implemented; requires Supabase configuration |
| Application submission and applicant-only listing | Implemented; requires Supabase schema |
| Admin role and review queue | Implemented; requires manual admin provisioning |
| Application status email | Optional Resend integration included; requires verified sender |
| Resource list/create and access tiers | Implemented; links should point to private, access-controlled files where needed |
| Activation gates | Implemented; requires verified agreement record and admin-recorded payment/training fields |
| Official e-signature API + verified webhook | Not connected; provider credentials and implementation still required |
| Resource file uploads/private signed-document archive | Not implemented; configure private Supabase Storage and signed URLs as a separate step |
| Live deployment and end-to-end production test | Not performed by this package |

## Known production hardening work
- Add rate limiting / bot protection (Netlify Edge or an upstream WAF) for auth and submission endpoints.
- Add account recovery, MFA for administrators, and session refresh/rotation.
- Configure private storage buckets and short-lived signed download URLs instead of public resource URLs for confidential material.
- Add legal/privacy review for cross-border data processing and retention.
- Add notification retry queue and delivery logs.
- Perform independent security review before accepting real agreements or sensitive partner information.
