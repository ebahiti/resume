# Resume contact API

Handles the contact form for elinorbahiti.ca. Runs on port 3003.

## Setup

1. Copy `.env.example` to `.env` in this directory.
2. Fill in SMTP (e.g. AWS SES), `CONTACT_EMAIL_FROM`, `CONTACT_EMAIL_TO`, and `RECAPTCHA_SECRET_KEY`. Use the same values as in the resume project if you already have them in `../.env`.
3. Start: `pm2 start ecosystem.config.cjs`

## PM2

- Start: `pm2 start ecosystem.config.cjs` (from this directory)
- Restart after changing .env: `pm2 restart resume-contact-api`
