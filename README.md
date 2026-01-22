# horse-racing-game

Minimal instructions

Prerequisites
- Node.js 24 and npm 11

Install
```bash
npm install
```

Dev server
```bash
npm run dev
# open http://localhost:5173
```

Build and preview
```bash
npm run build
npm run preview
```

Unit tests (Vitest)
```bash
npm run test:unit
```

E2E tests (Playwright)
```bash
npm run test:e2e
```

i18n
- Locales: `src/app/i18n/locales/` (default: `eng`)
- Use translation: `t('schedule.roundTitle', { round, distance })`

Important paths
- App entry: `src/app/main.ts`
- Store: `src/app/store/` (race module)
- Tests: `tests/unit/`, `tests/e2e/`

Contact
- For additional changes or translations, modify `src/app/i18n/locales/` and add UI usage of `t()` where needed.
