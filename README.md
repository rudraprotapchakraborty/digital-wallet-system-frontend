# DigiPay frontend

A React and JavaScript wallet app built with Vite and Tailwind CSS. The app includes personal, agent, and admin workspaces.

## Local development

1. Install Node 24 LTS or newer. In the backend repo, configure a development MongoDB replica set and run `npm ci` followed by `npm run dev` (port 5000).
2. In this repo, run `npm ci` and `npm run dev`, then open [localhost:3000](http://localhost:3000). Vite proxies `/api` to the local backend.
3. Optional settings are listed in `.env.example`. Set `VITE_API_URL` to an API URL including `/api` to override the default. Production builds otherwise use the original hosted backend.
4. Run `npm run build` for the production bundle.

## Google sign-in

Create a Web application client in [Google Cloud](https://console.cloud.google.com/apis/credentials). Under Authorized JavaScript origins, add `http://localhost:3000` and the exact deployed frontend origin. Put its public ID in `GOOGLE_CLIENT_ID` in a local `.env.local` and in `GOOGLE_CLIENT_ID` on the API. Restart both dev servers or rebuild the deployed frontend. Keep secrets out of Vite variables.

First-time Google users choose a wallet phone number. Returning users go directly to their personal dashboard. Password accounts enter their details on one form and confirm their email on a second screen. They can sign in with email or wallet phone number. Account settings support photo uploads, email and password changes, and confirmed wallet closure. The login page displays the seeded personal, agent and admin test logins.
