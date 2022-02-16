const os = require('os')

module.exports = function() {
    let networkInterfaces = os.networkInterfaces()

    let localAddresses = []
    for (let index in networkInterfaces) {
        let interIPv4 = networkInterfaces[index].filter((inter) => {
            return inter.family == 'IPv4' && inter.address != '127.0.0.1'
        }).map((inter) => {
            return inter.address
        })

        localAddresses = localAddresses.concat(interIPv4)
    }

    return localAddresses
}