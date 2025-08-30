# Reaction Speed — Mini Game

A small React + Vite mini-game that tests reaction speed. Built with Tailwind CSS and Framer Motion for animations.

## Features
- Click the moving target before the timer runs out.
- Difficulty increases each round (time limit shortens).
- Pause/resume, restart, and save-best-score (localStorage).
- Mock leaderboard stored in `localStorage`.
- Responsive and mobile-friendly UI.
- All source files provided in this folder — ready for `npm install`.

## How to run locally
1. Install Node.js (v18+ recommended).
2. Extract this folder.
3. Open a terminal in the project folder and run:
   ```bash
   npm install
   npm run dev
   ```
4. Open the local dev URL displayed by Vite (usually http://localhost:5173).

## Build & Deploy
- Build with `npm run build`.
- Deploy the `dist` folder to Netlify/Vercel. (Netlify: drag & drop `dist` or connect GitHub repo. Vercel: `vercel` CLI or import repo.)

## Controls
- START — begin the game.
- PAUSE — pause the current run.
- SAVE BEST — store current best score to localStorage.
- RESTART — reset current run and score.

## Files included
- `index.html`, `package.json`, `vite.config.js`
- `src/` with React components and styles
- `tailwind.config.cjs`, `postcss.config.cjs`
- `README.md`, `src/assets/leaderboard.json` (mock data)

## Known issues
- No server-side leaderboard (mock only).
- No audio by default; feel free to add sounds in `src/assets` and play them on events.
- Designed as a small demo — many polish options (themes, difficulty modes) can be added.

## Notes for submission
- To create a single downloadable folder: the zip included in the deliverable contains everything.
- For a live demo and short video, deploy to Vercel/Netlify and record a 30–60s screen capture showing gameplay and restart.

Enjoy — tweak and improve the UI/UX as needed!
