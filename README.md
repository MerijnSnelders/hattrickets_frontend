# HatTrickets Frontend

HatTrickets is a full-stack application for buying football tickets. The core challenge is processing dynamic data from an external match API while making sure two people can never book the same seat.

This repository contains the React frontend. The Java Spring backend lives in [hattrickets_backend](https://github.com/MerijnSnelders/hattrickets_backend).

## Status

Finished. I built this as an individual school project at Fontys and made everything myself, frontend and backend.

## Technologies

**Frontend (this repository)**

- React 19 and TypeScript
- Vite
- Tailwind CSS 4 and shadcn/ui-style components (Radix, lucide icons)
- React Router
- Axios
- STOMP and SockJS for WebSockets
- Google sign-in with `@react-oauth/google` and `jwt-decode`
- Cypress for end-to-end tests
- ESLint

**Backend (separate repository)**

- Java with Spring
- OAuth 2.0 with Google
- Flyway database migrations
- Docker

## Features

- Live seat selection: a seat is marked for everyone the moment someone selects it, using WebSockets
- Ticket booking with create, read, update and delete functions
- Match data from an external football API
- Secure sign-in with Google (OAuth 2.0), which I added to challenge myself

## Project structure

```
.
├── src/                  # React application code
├── public/               # Static assets
├── cypress/              # End-to-end tests
├── index.html            # Vite entry page
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
├── components.json       # shadcn/ui configuration
├── eslint.config.js      # Linting rules
└── cypress.config.ts     # Cypress configuration
```

## How to run it

You need Node.js 18 or newer. The frontend needs the backend, so start the [backend](https://github.com/MerijnSnelders/hattrickets_backend) first and follow the steps in its README.

```bash
git clone https://github.com/MerijnSnelders/hattrickets_frontend.git
cd hattrickets_frontend
npm install
npm run dev
```

Other scripts:

- `npm run build` creates a production build
- `npm run preview` serves the production build locally
- `npm run lint` checks the code with ESLint

Create a `.env` file in the project root with the address of the backend and your Google client ID. Use your own values, never commit real keys:

```
VITE_API_URL=http://localhost:8080
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

The variable names above are placeholders. Check the source code for the exact names used.

## Contributing

1. Create a branch from `main`.
2. Run `npm run lint` and the Cypress tests before you commit.
3. Open a pull request with a short description of what you changed.

## Process

I started by planning the features and writing user stories for each of them. I worked in about six sprints.

I made a simple design first and then converted it into code. After that I connected the frontend to the backend and wrote end-to-end tests. The process was iterative, so some features were added along the way.

## What I learned

- Building a frontend with React and TypeScript
- Real-time messaging with WebSockets
- Google sign-in with OAuth 2.0 and JWT
- End-to-end testing with Cypress

## How it could improve

- Deploy the application with proper hosting
- Remove unused dependencies
- Stop committing generated files
- Expand the Cypress tests

## Preview

https://github.com/user-attachments/assets/426a264e-90f3-41a4-9d27-da584c3cbd7c

