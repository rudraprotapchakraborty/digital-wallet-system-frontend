<div align="center">

# 💸 Digital Wallet System

**Digital wallet for sending money, deposits, withdrawals and agent cash services.**

[**Live demo**](https://digital-wallet-system-frontend-topaz.vercel.app/) · [Backend API](https://github.com/rudraprotapchakraborty/digital-wallet-system-backend) · [Portfolio](https://rudraprotapchakraborty.com/projects)

![React](https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61dafb) ![Vite](https://img.shields.io/badge/Vite-646cff?style=for-the-badge&logo=vite&logoColor=ffffff) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-0f172a?style=for-the-badge&logo=tailwindcss&logoColor=38bdf8) ![Recharts](https://img.shields.io/badge/Recharts-22b5bf?style=for-the-badge) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=ffffff)

<a href="https://digital-wallet-system-frontend-topaz.vercel.app/"><img src="https://i.ibb.co/HLx4BZ5g/digipay.webp" alt="Digital Wallet System: home page" width="880"></a>

</div>

> The web app of **DigiPay**.
>
> - Send money by phone number, add and withdraw funds, search transaction history
> - Agents handle cash-in and cash-out and earn a 1% commission
> - Admins review activity, manage wallet access and approve agents
> - MongoDB transactions keep balances and transaction records together

A digital wallet for personal transfers and agent-assisted cash services. Members send money to another wallet by phone number, add and withdraw funds, and search their transaction history by reference, type, status or date. Approved agents handle cash-in and cash-out and earn a 1% commission, while administrators review activity, manage wallet access and approve or suspend agents. Features email verification with one-time codes, Google sign-in, an account settings page, dashboards with charts, test logins for each role, and a light and dark theme.

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

Use **Node.js 24 or newer**. Start the [wallet API](https://github.com/rudraprotapchakraborty/digital-wallet-system-backend#run-locally) on port 5000, then run these commands from this repository.

```sh
npm ci
npm run dev
```

Open **[localhost:3000](http://localhost:3000)**. Vite forwards requests under `/api` to the local backend.

| Frontend setting | When to set it in `.env.local` |
| --- | --- |
| `GOOGLE_CLIENT_ID` | To enable Google sign-in, use the same public web client ID as the backend. Authorize the local and deployed frontend origins in Google Cloud. |
| `VITE_API_URL` | To target another API, supply its full base URL including `/api`. Production builds otherwise use the hosted API. |

## Build and preview

```sh
npm run build
npm run preview
```

Vite writes the production site to `dist/`. Frontend settings are embedded at build time. On Vercel, the SPA rewrite lets visitors open routes such as `/register` directly.

**Built with** React · JavaScript · Vite · Tailwind CSS · React Router · Recharts

---

<div align="center">

Made by **[Rudra Protap Chakraborty](https://rudraprotapchakraborty.com)** · [Portfolio](https://rudraprotapchakraborty.com) · [GitHub](https://github.com/rudraprotapchakraborty)

</div>
