import sharedUtils from './shared.js'

export * from './shared.js'

function createUnsupportedFunction(name) {
    return function unsupportedInBrowser() {
        throw new Error(`${name} is available only in Node.js environments`)
    }
}

const getLocalAddress = createUnsupportedFunction('getLocalAddress')
const getLocalAddresses = createUnsupportedFunction('getLocalAddresses')
const getCPUUsage = createUnsupportedFunction('getCPUUsage')
const getLocalIPv4Address = getLocalAddress
const getLocalIPv4Addresses = getLocalAddresses

const browserUtils = {
    ...sharedUtils,
    getLocalAddress,
    getLocalAddresses,
    getCPUUsage,
    getLocalIPv4Address,
    getLocalIPv4Addresses,
}

export { getLocalAddress, getLocalAddresses, getCPUUsage, getLocalIPv4Address, getLocalIPv4Addresses }

export default browserUtils
