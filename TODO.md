# TODO / Audit Plan

## Critical (P0)

- [x] Fix `getRandFloat`:
  - removed broken string construction and `this`-bound call
  - added input validation and stable precision handling
- [x] Fix `isJSON`:
  - now correctly returns `true` for valid scalar JSON values (`"0"`, `"false"`, `"null"`)
- [x] Fix `shuffle`:
  - replaced biased `sort(() => Math.random())` style with Fisher-Yates algorithm
- [x] Make `md5` browser-compatible:
  - removed Node-only `crypto` import from shared code
  - implemented sync cross-platform MD5
- [x] Split Node/Browser entrypoints:
  - Node entry exports real OS helpers
  - Browser entry exports explicit stubs for OS helpers (clear runtime error instead of import failure)

## High Priority (P1)

- [x] Add deterministic tests with `node:test` + `assert` instead of `console.log` smoke script
- [ ] Migrate lint stack to ESLint flat config and declare tooling dependencies explicitly
- [ ] Add CI pipeline (`node 18/20/22 + browser smoke`) for regression protection
- [ ] Add coverage threshold (target >= 90% for core utils)
- [ ] Add benchmark for hot methods (`shuffle`, random generators, hash)

## Medium Priority (P2)

- [ ] Add TypeScript declaration file (`.d.ts`) for better DX in editors
- [ ] Document each function with input/output contracts and edge cases
- [ ] Add ESM-only migration note and examples for bundlers (Vite/Webpack/Rollup)

## Dependency Status

- Current package had no declared runtime/dev dependencies, so direct dependency upgrades were not required.
- To keep tooling truly on latest versions in connected environments:
  - `npm outdated`
  - `npm update`
  - `npm audit fix`
