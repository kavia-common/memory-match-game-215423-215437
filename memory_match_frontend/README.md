# Memory Match Frontend

A modern, lightweight React implementation of a Memory Match game.

## Features

- Light theme with #3b82f6 and #06b6d4 accents
- Responsive, centered grid (4x4 or 6x4)
- Flip animations, hover/focus states
- Move counter and timer
- Victory banner and restart
- Accessible buttons and ARIA attributes

## Scripts

- npm start — runs on http://localhost:3000
- npm run build — production build

## Structure

- src/components/Header.jsx — title, size selector, stats, restart
- src/components/GameBoard.jsx — grid layout
- src/components/Card.jsx — flippable card
- src/components/Footer.jsx — minimal footer
- src/styles/theme.css — CSS variables and shared UI
- src/styles/app.css — layout, board, animations
- src/App.js — game logic and state

No external services or environment variables required.
