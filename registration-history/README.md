# Registration History (React + Vite + Tailwind)

A beautiful, hardcoded registration history table that auto-calculates expiry dates and lets you download a simple text certificate per user.

## Scripts
```bash
npm install
npm run dev
npm run build
npm run preview
```

## Where to edit data
Edit `src/data/registrations.js` to change rows.

## Date format
All dates are shown as **DD MMM YYYY** (e.g., 14 Aug 2025).

## Notes
- Certificate download creates a small `.txt` file on the fly.
- Expiry date = registration date + plan months (month-end safe).
