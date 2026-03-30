---
description: Verify and run Altaria V1 flawlessly
---

This workflow guarantees the Altaria V1 website dependencies are intact, code style is enforced, and the project compiles perfectly before running the development server.

// turbo
1. Install dependencies to ensure everything is up-to-date:
`npm install`

// turbo
2. Run the Next.js linter to catch any syntax or style issues:
`npm run lint`

// turbo
3. Build the application to verify there are no compilation or static generation errors:
`npm run build`

// turbo
4. Run the development server (runs in background on port 3000):
`npm run dev`

5. Verify that the website is successfully running by opening http://localhost:3000 in your browser and checking that the Lottie loading screen, smooth scrolling, and Vanta.js background work as intended.
