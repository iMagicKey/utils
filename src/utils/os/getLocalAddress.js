import os from 'node:os'

function isIPv4Interface(networkInterface) {
    return (networkInterface.family === 'IPv4' || networkInterface.family === 4) && !networkInterface.internal
}

export default function getLocalAddress() {
    const networkInterfaces = os.networkInterfaces()
    const addresses = []

    for (const interfaces of Object.values(networkInterfaces)) {
        if (!Array.isArray(interfaces)) {
            continue
        }

        for (const networkInterface of interfaces) {
            if (isIPv4Interface(networkInterface)) {
                addresses.push(networkInterface.address)
            }
        }
    }

    return addresses[0]
}
