# imagic-utils

Utility helpers for randomization, IDs, strings, arrays, JSON, timing, hashing and OS info.

## Install

```bash
npm i imagic-utils
```

## Usage (Node.js)

```js
import utils, { getRandInteger, getCPUUsage } from 'imagic-utils'

const random = getRandInteger(1, 10)
const cpuUsage = await getCPUUsage(250)
```

## Usage (Browser)

```js
import utils, { md5, getRandString } from 'imagic-utils'

const hash = md5('hello')
const token = getRandString(16)
```

In browser builds, OS utilities (`getLocalAddress`, `getLocalAddresses`, `getCPUUsage`) are exported as stubs and throw an explicit error when called.

## Explicit aliases

Backward-compatible aliases with clearer names are available:

- `getRandomArrayItem` -> `getRandArrayItem`
- `getRandomFloat` -> `getRandFloat`
- `getRandomInteger` -> `getRandInteger`
- `getRandomString` -> `getRandString`
- `generateUuidV4` -> `generateBigId`
- `generateHexId` -> `generateId`
- `getLocalIPv4Address` -> `getLocalAddress`
- `getLocalIPv4Addresses` -> `getLocalAddresses`

## Compatibility

- Node.js: `>=18`
- Browser: modern evergreen browsers (via `browser` export path)
