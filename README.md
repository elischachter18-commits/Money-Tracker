# Money Tracker

A full-screen money tracker for iPhone, set up the same way as 200 Lean: hosted on GitHub Pages and synced through the same Firebase project, so you sign in with your 200 Lean email and password. Its data is stored separately from 200 Lean (`users/<you>/money`), and only you can read it.

## Files

| File | What it is |
|---|---|
| `index.html` | The app |
| `firebase-config.js` | Same Firebase settings as 200 Lean (already filled in) |
| `manifest.webmanifest`, `icon-*.png`, `apple-touch-icon.png` | Home-screen name and the glowing blue $ icon |
| `sw.js` | Lets the app open with no signal |

Your backup file (`money-tracker-backup-2026-10-31.json`) sits **outside** this folder on purpose. Never upload it to GitHub: the repository is public.

## Setup

Firebase needs nothing new: it's the same project, and its rules already let you read and write your own data.

### 1. GitHub Pages
1. Sign in at github.com (the same account as 200 Lean).
2. New repository named `money-tracker`, **Public**.
3. **Add file > Upload files**: drag in every file from this folder and commit.
4. **Settings > Pages**: Source **Deploy from a branch**, branch **main**, folder **/ (root)**, save.
5. After a minute or two the app is live at `https://<your-username>.github.io/money-tracker/`.

If you host it on a different GitHub account than 200 Lean, add that `<username>.github.io` under Firebase **Authentication > Settings > Authorized domains**.

### 2. On your iPhone
1. Open the address in **Safari** and tap **Share > Add to Home Screen**.
2. Open it from the home-screen icon and **sign in with your 200 Lean email and password**.

### 3. Bring your entries over (once)
1. On your laptop, open the same address and sign in.
2. Tap **Import backup** (on the example banner, or in **Settings**) and pick `money-tracker-backup-2026-10-31.json`. It syncs to your phone.

## Updating
Upload the changed files to the same repository. The app picks up the new version the second time you open it.
