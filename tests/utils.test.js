import os from 'node:os'
import { test } from 'node:test'
import { expect } from 'chai'

import browserUtils, {
    getCPUUsage as getBrowserCPUUsage,
    getLocalAddress as getBrowserLocalAddress,
    getLocalAddresses as getBrowserLocalAddresses,
    getLocalIPv4Address as getBrowserLocalIPv4Address,
    getLocalIPv4Addresses as getBrowserLocalIPv4Addresses,
} from '../src/browser.js'
import utils, {
    chance,
    chunkArray,
    generateBigId,
    generateId,
    generateHexId,
    generateUuidV4,
    getCPUUsage,
    getLocalAddress,
    getLocalAddresses,
    getLocalIPv4Address,
    getLocalIPv4Addresses,
    getRandArrayItem,
    getRandFloat,
    getRandInteger,
    getRandString,
    getRandomArrayItem,
    getRandomFloat,
    getRandomInteger,
    getRandomString,
    isJSON,
    md5,
    shuffle,
    wait,
} from '../src/index.js'
import sharedUtils, {
    generateHexId as generateHexIdFromShared,
    generateUuidV4 as generateUuidV4FromShared,
    getRandomArrayItem as getRandomArrayItemFromShared,
    getRandomFloat as getRandomFloatFromShared,
    getRandomInteger as getRandomIntegerFromShared,
    getRandomString as getRandomStringFromShared,
} from '../src/shared.js'
import getRandomBytes from '../src/utils/general/getRandomBytes.js'

function withMockedMathRandom(randomValue, fn) {
    const originalRandom = Math.random
    Math.random = () => randomValue
    try {
        return fn()
    } finally {
        Math.random = originalRandom
    }
}

function withMockedMathRandomSequence(randomValues, fn) {
    const originalRandom = Math.random
    let index = 0
    Math.random = () => {
        const value = randomValues[index]
        index = Math.min(index + 1, randomValues.length - 1)
        return value
    }

    try {
        return fn()
    } finally {
        Math.random = originalRandom
    }
}

async function withMockedSetTimeout(fn) {
    const originalSetTimeout = globalThis.setTimeout
    globalThis.setTimeout = (handler) => {
        handler()
        return 0
    }

    try {
        return await fn()
    } finally {
        globalThis.setTimeout = originalSetTimeout
    }
}

async function withMockedOS(methodName, mockedMethod, fn) {
    const originalMethod = os[methodName]
    os[methodName] = mockedMethod
    try {
        return await fn()
    } finally {
        os[methodName] = originalMethod
    }
}

function withMockedCrypto(mockedCrypto, fn) {
    const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'crypto')

    Object.defineProperty(globalThis, 'crypto', {
        value: mockedCrypto,
        configurable: true,
        writable: true,
        enumerable: descriptor ? descriptor.enumerable : true,
    })

    try {
        return fn()
    } finally {
        if (descriptor) {
            Object.defineProperty(globalThis, 'crypto', descriptor)
        } else {
            delete globalThis.crypto
        }
    }
}

test('default export includes shared and node-only utils', () => {
    expect(utils).to.include.keys('getRandInteger', 'getRandFloat', 'md5', 'getCPUUsage', 'getLocalAddress', 'getLocalAddresses')
    expect(utils).to.include.keys('getRandomInteger', 'getRandomFloat', 'getLocalIPv4Address', 'getLocalIPv4Addresses')
})

test('shared export includes only cross-platform utilities', () => {
    expect(sharedUtils).to.include.keys('getRandInteger', 'getRandFloat', 'md5', 'getRandomInteger', 'getRandomFloat')
    expect(sharedUtils).to.not.have.property('getLocalAddress')
    expect(sharedUtils).to.not.have.property('getCPUUsage')
})

test('browser export keeps shared utilities and stubs node-only ones', () => {
    expect(browserUtils).to.include.keys('getRandInteger', 'md5', 'getLocalAddress', 'getLocalAddresses', 'getCPUUsage')
    expect(browserUtils).to.include.keys('getLocalIPv4Address', 'getLocalIPv4Addresses')
    expect(() => getBrowserLocalAddress()).to.throw(/Node\.js/)
    expect(() => getBrowserLocalAddresses()).to.throw(/Node\.js/)
    expect(() => getBrowserCPUUsage()).to.throw(/Node\.js/)
    expect(() => getBrowserLocalIPv4Address()).to.throw(/Node\.js/)
    expect(() => getBrowserLocalIPv4Addresses()).to.throw(/Node\.js/)
})

test('new explicit aliases map to existing implementations', () => {
    expect(getRandomArrayItem).to.equal(getRandArrayItem)
    expect(getRandomFloat).to.equal(getRandFloat)
    expect(getRandomInteger).to.equal(getRandInteger)
    expect(getRandomString).to.equal(getRandString)
    expect(generateUuidV4).to.equal(generateBigId)
    expect(generateHexId).to.equal(generateId)
})

test('shared named aliases map to original implementations', () => {
    expect(getRandomArrayItemFromShared).to.equal(getRandArrayItem)
    expect(getRandomFloatFromShared).to.equal(getRandFloat)
    expect(getRandomIntegerFromShared).to.equal(getRandInteger)
    expect(getRandomStringFromShared).to.equal(getRandString)
    expect(generateUuidV4FromShared).to.equal(generateBigId)
    expect(generateHexIdFromShared).to.equal(generateId)
})

test('node explicit os aliases map to existing implementations', () => {
    expect(getLocalIPv4Address).to.equal(getLocalAddress)
    expect(getLocalIPv4Addresses).to.equal(getLocalAddresses)
})

test('removed aliases are not exported anymore', () => {
    expect(utils).to.not.have.property('isValidJson')
    expect(utils).to.not.have.property('delay')
    expect(utils).to.not.have.property('hashMd5')
    expect(utils).to.not.have.property('isChanceSuccess')
    expect(utils).to.not.have.property('getCpuUsageRatio')

    expect(sharedUtils).to.not.have.property('isValidJson')
    expect(sharedUtils).to.not.have.property('delay')
    expect(sharedUtils).to.not.have.property('hashMd5')
    expect(sharedUtils).to.not.have.property('isChanceSuccess')

    expect(browserUtils).to.not.have.property('getCpuUsageRatio')
})

test('chunkArray splits arrays and validates inputs', () => {
    expect(chunkArray([ 1, 2, 3, 4, 5 ], 2)).to.deep.equal([ [1, 2], [3, 4], [5] ])
    expect(chunkArray([ 1, 2 ], 10)).to.deep.equal([ [1, 2] ])
    expect(chunkArray([], 3)).to.deep.equal([])
    expect(() => chunkArray('abc', 2)).to.throw(/array/)
    expect(() => chunkArray([ 1, 2 ], 0)).to.throw(/chunkSize/)
    expect(() => chunkArray([ 1, 2 ], 1.5)).to.throw(/chunkSize/)
})

test('getRandArrayItem handles invalid and empty arrays', () => {
    expect(() => getRandArrayItem(null)).to.throw(/array/)
    expect(getRandArrayItem([])).to.equal(undefined)
})

test('getRandArrayItem returns deterministic item with mocked random', () => {
    const value = withMockedMathRandom(0.9999, () => getRandArrayItem([ 'a', 'b', 'c', 'd' ]))
    expect(value).to.equal('d')
})

test('getRandFloat validates arguments', () => {
    expect(() => getRandFloat(Number.NaN, 1)).to.throw(/min and max/)
    expect(() => getRandFloat(1, Number.POSITIVE_INFINITY)).to.throw(/min and max/)
    expect(() => getRandFloat(1, 2, -1)).to.throw(/decimalPoint/)
    expect(() => getRandFloat(1, 2, 1.5)).to.throw(/decimalPoint/)
    expect(() => getRandFloat(1, 2, 16)).to.throw(/decimalPoint/)
})

test('getRandFloat respects bounds and precision', () => {
    const fixedHigh = withMockedMathRandom(1, () => getRandFloat(1, 3, 2))
    expect(fixedHigh).to.equal(3)

    const fixedLow = withMockedMathRandom(0, () => getRandFloat(1, 3, 2))
    expect(fixedLow).to.equal(1)

    const value = getRandFloat(5, 2, 3)
    expect(value).to.be.at.least(2).and.at.most(5)
    expect(Number(value.toFixed(3))).to.equal(value)
})

test('getRandInteger validates arguments and ranges', () => {
    expect(() => getRandInteger(Number.NaN, 1)).to.throw(/min and max/)
    expect(() => getRandInteger(1, Number.NaN)).to.throw(/min and max/)
    expect(() => getRandInteger(0.1, 0.2)).to.throw(/integer range/)
})

test('getRandInteger supports reversed range and single integer range', () => {
    for (let index = 0; index < 100; index += 1) {
        const value = getRandInteger(10, 5)
        expect(value).to.be.at.least(5).and.at.most(10)
    }

    expect(getRandInteger(3.2, 4)).to.equal(4)
})

test('chance validates inputs and handles deterministic boundaries', () => {
    expect(() => chance(Number.NaN)).to.throw(/finite/)
    expect(chance(-10)).to.equal(false)
    expect(chance(0)).to.equal(false)
    expect(chance(100)).to.equal(true)
    expect(chance(1000)).to.equal(true)
    expect(withMockedMathRandom(0, () => chance(1))).to.equal(true)
    expect(withMockedMathRandom(0.99, () => chance(1))).to.equal(false)
})

test('generateId and generateBigId return expected formats', () => {
    const id = generateId()
    const bigId = generateBigId()

    expect(id).to.match(/^[a-f0-9]{32}$/)
    expect(bigId).to.match(/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/)
})

test('isJSON handles valid and invalid values', () => {
    expect(isJSON('{}')).to.equal(true)
    expect(isJSON('[]')).to.equal(true)
    expect(isJSON('0')).to.equal(true)
    expect(isJSON('false')).to.equal(true)
    expect(isJSON('null')).to.equal(true)
    expect(isJSON('not json')).to.equal(false)
    expect(isJSON('')).to.equal(false)
    expect(isJSON({})).to.equal(false)
    expect(isJSON(0)).to.equal(false)
})

test('shuffle validates input and returns a copied array', () => {
    expect(() => shuffle('abc')).to.throw(/array/)
    expect(shuffle([])).to.deep.equal([])
    expect(shuffle([ 1 ])).to.deep.equal([1])

    const source = [ 1, 2, 3, 4 ]
    const result = shuffle(source)
    expect([ ...result ].sort()).to.deep.equal([ ...source ].sort())
    expect(result).to.not.equal(source)
})

test('shuffle uses Fisher-Yates swaps with deterministic sequence', () => {
    const source = [ 'a', 'b', 'c', 'd' ]
    const result = withMockedMathRandomSequence([ 0.75, 0.5, 0.25 ], () => shuffle(source))
    expect(result).to.deep.equal([ 'c', 'a', 'b', 'd' ])
})

test('wait validates input', () => {
    expect(() => wait(-1)).to.throw(/milliseconds/)
    expect(() => wait(Number.NaN)).to.throw(/milliseconds/)
})

test('wait resolves after timeout', async () => {
    const start = Date.now()
    await wait(20)
    const elapsed = Date.now() - start
    expect(elapsed).to.be.at.least(10)
})

test('md5 returns known hashes for string and non-string input', () => {
    expect(md5('abc')).to.equal('900150983cd24fb0d6963f7d28e17f72')
    expect(md5('hello')).to.equal('5d41402abc4b2a76b9719d911017c592')
    expect(md5(123)).to.equal('202cb962ac59075b964b07152d234b70')
})

test('getRandString validates inputs', () => {
    expect(() => getRandString(-1)).to.throw(/length/)
    expect(() => getRandString(1.5)).to.throw(/length/)
    expect(() => getRandString(4, '')).to.throw(/charSet/)
    expect(() => getRandString(4, null)).to.throw(/charSet/)
})

test('getRandString handles default and custom charsets', () => {
    const defaultValue = getRandString()
    expect(defaultValue).to.have.lengthOf(16)
    expect(getRandString(0)).to.equal('')

    const customValue = withMockedMathRandom(0, () => getRandString(4, 'XY'))
    expect(customValue).to.equal('XXXX')
})

test('getRandomBytes validates length', () => {
    expect(() => getRandomBytes(0)).to.throw(/length/)
    expect(() => getRandomBytes(1.2)).to.throw(/length/)
    expect(() => getRandomBytes(-1)).to.throw(/length/)
})

test('getRandomBytes uses crypto branch when available', () => {
    const mockCrypto = {
        getRandomValues(array) {
            for (let index = 0; index < array.length; index += 1) {
                array[index] = 7
            }

            return array
        },
    }

    const bytes = withMockedCrypto(mockCrypto, () => getRandomBytes(4))
    expect(Array.from(bytes)).to.deep.equal([ 7, 7, 7, 7 ])
})

test('getRandomBytes falls back to Math.random when crypto is unavailable', () => {
    const bytes = withMockedCrypto(undefined, () => withMockedMathRandom(0.5, () => getRandomBytes(3)))
    expect(Array.from(bytes)).to.deep.equal([ 128, 128, 128 ])
})

test('getLocalAddresses filters interfaces and supports both family formats', async () => {
    await withMockedOS(
        'networkInterfaces',
        () => {
            return {
                eth0: [
                    { family: 'IPv4', internal: false, address: '10.0.0.2' },
                    { family: 'IPv6', internal: false, address: '::1' },
                ],
                wlan0: [
                    { family: 4, internal: false, address: '192.168.1.3' },
                    { family: 'IPv4', internal: true, address: '127.0.0.1' },
                ],
                ignored: null,
            }
        },
        async () => {
            expect(getLocalAddresses()).to.deep.equal([ '10.0.0.2', '192.168.1.3' ])
            expect(getLocalAddress()).to.equal('10.0.0.2')
        }
    )
})

test('getLocalAddress returns undefined when no external ipv4 addresses exist', async () => {
    await withMockedOS(
        'networkInterfaces',
        () => {
            return {
                lo: [ { family: 'IPv4', internal: true, address: '127.0.0.1' } ],
            }
        },
        async () => {
            expect(getLocalAddress()).to.equal(undefined)
            expect(getLocalAddresses()).to.deep.equal([])
        }
    )
})

test('getCPUUsage validates milliseconds argument', () => {
    expect(() => getCPUUsage(-1)).to.throw(/ms/)
    expect(() => getCPUUsage(Number.NaN)).to.throw(/ms/)
})

test('getCPUUsage computes busy and free ratios', async () => {
    const cpusSequence = [
        [
            { times: { user: 100, nice: 0, sys: 0, idle: 100, irq: 0 } },
            { times: { user: 100, nice: 0, sys: 0, idle: 100, irq: 0 } },
        ],
        [
            { times: { user: 130, nice: 0, sys: 0, idle: 170, irq: 0 } },
            { times: { user: 130, nice: 0, sys: 0, idle: 170, irq: 0 } },
        ],
    ]

    let cpusCallIndex = 0
    const mockedCpus = () => {
        const value = cpusSequence[Math.min(cpusCallIndex, cpusSequence.length - 1)]
        cpusCallIndex += 1
        return value
    }

    await withMockedOS('cpus', mockedCpus, async () => {
        await withMockedSetTimeout(async () => {
            const usage = await getCPUUsage(50, false)
            expect(usage).to.be.closeTo(0.3, 0.000001)
        })
    })

    cpusCallIndex = 0
    await withMockedOS('cpus', mockedCpus, async () => {
        await withMockedSetTimeout(async () => {
            const freeUsage = await getCPUUsage(50, true)
            expect(freeUsage).to.be.closeTo(0.7, 0.000001)
        })
    })
})

test('getCPUUsage handles zero total delta branch', async () => {
    const mockedCpus = () => {
        return [
            { times: { user: 100, nice: 0, sys: 0, idle: 100, irq: 0 } },
        ]
    }

    await withMockedOS('cpus', mockedCpus, async () => {
        await withMockedSetTimeout(async () => {
            const freeUsage = await getCPUUsage(10, true)
            const busyUsage = await getCPUUsage(10, false)
            expect(freeUsage).to.equal(0)
            expect(busyUsage).to.equal(1)
        })
    })
})
