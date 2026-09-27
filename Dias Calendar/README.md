# AITU Deadlines

Personal web dashboard for a dynamic AITU Moodle calendar URL.

## Setup

1. Install Node.js 20+.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local`.
4. Put your private Moodle dynamic Calendar URL in `MOODLE_CALENDAR_URL`.
5. Run `npm run dev` and open http://localhost:3000.

## Security

The Moodle Calendar URL contains a private token. Never commit `.env.local`, paste the URL into frontend code, or publish it. If a token has been exposed publicly, regenerate/revoke it in Moodle and use the new URL.

## Deploying to Vercel

Create a project from this folder/repository and add `MOODLE_CALENDAR_URL` as a server-side Environment Variable in Vercel. Do not prefix it with `NEXT_PUBLIC_`.

The browser calls `/api/calendar`; only the server knows the Moodle URL.
