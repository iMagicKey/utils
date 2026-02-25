import sharedUtils from './shared.js'
import getLocalAddress from './utils/os/getLocalAddress.js'
import getLocalAddresses from './utils/os/getLocalAddresses.js'
import getCPUUsage from './utils/os/getCPUUsage.js'

export * from './shared.js'

const getLocalIPv4Address = getLocalAddress
const getLocalIPv4Addresses = getLocalAddresses

const nodeUtils = {
    ...sharedUtils,
    getLocalAddress,
    getLocalAddresses,
    getCPUUsage,
    getLocalIPv4Address,
    getLocalIPv4Addresses,
}

export { getLocalAddress, getLocalAddresses, getCPUUsage, getLocalIPv4Address, getLocalIPv4Addresses }

export default nodeUtils
