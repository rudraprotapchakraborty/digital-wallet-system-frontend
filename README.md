# DigiPay · Web app

A digital wallet simulator with three ways to explore a transaction. Send money as a customer, handle cash at an agent counter, or oversee wallets as an administrator.

**[Open DigiPay](https://digital-wallet-system-frontend-topaz.vercel.app/) · [Try a demo login](https://digital-wallet-system-frontend-topaz.vercel.app/login) · [Backend repository](https://github.com/rudraprotapchakraborty/B5-Assignment-5)**

## Explore the demo

On the login page, choose **Use login** beside a test account, then sign in. To follow a transfer, start with a personal account, open **Send money**, choose a demo receiver, and review the amount. After confirming, open **History** to see the transaction.

| Workspace | What you can do |
| --- | --- |
| **Personal** | Send money by phone number, add or withdraw funds, and cash out to an approved agent. |
| **Agent** | Use your agent balance to cash in a customer and review transactions at your counter. |
| **Admin** | Review transactions, approve or suspend agents, and block or unblock wallets. Admin accounts have no wallet balance. |

## Registration and account access

Choose **Personal** or **Agent** before signing up with a password or Google. Password registration collects a name, email, wallet phone number, and password, then verifies the email with a six-digit code. New Google users supply their wallet phone number. Agent accounts require approval.

Returning members can sign in with Google or use an email address or phone number and password. Profile settings cover names, photos, email changes, passwords, and account deletion.

## Run locally

Use **Node.js 24 or newer**. Start the [wallet API](https://github.com/rudraprotapchakraborty/B5-Assignment-5#run-locally) on port 5000, then run these commands from this repository.

```sh
npm ci
npm run dev
```

Open **[localhost:3000](http://localhost:3000)**. Vite forwards requests under `/api` to the local backend.

| Frontend setting | When to set it in `.env.local` |
| --- | --- |
| `GOOGLE_CLIENT_ID` | To enable Google sign-in, use the same public web client ID as the backend. Authorize the local and deployed frontend origins in Google Cloud. |
| `VITE_API_URL` | To target another API, supply its full base URL including `/api`. Production builds otherwise use the hosted DigiPay API. |

## Build and preview

```sh
npm run build
npm run preview
```

Vite writes the production site to `dist/`. Frontend settings are embedded at build time. On Vercel, the SPA rewrite lets visitors open routes such as `/register` directly.

**Built with** React · JavaScript · Vite · Tailwind CSS · React Router · Recharts
