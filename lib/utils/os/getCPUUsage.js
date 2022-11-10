const os = require('os')

module.exports = function(ms = 1000, free = false) {
    function getCPUInfo () {
        let stats = os.cpus().map((cpu) => {
            return {
                total: cpu.times.user + cpu.times.nice + cpu.times.sys + cpu.times.idle + cpu.times.irq,
                idle: cpu.times.idle
            }
        })
        
        return stats.reduce((a, b) => {
            return {
                total: a.total + b.total, 
                idle: a.idle + b.idle
            }
        })
    }

    return new Promise((resolve) => {
        const startStats = getCPUInfo()
        setTimeout(() => {
            const endStats = getCPUInfo()
            if (free) {
                resolve((endStats.idle - startStats.idle) / (endStats.total - startStats.total))
            } else {
                resolve(1 - (endStats.idle - startStats.idle) / (endStats.total - startStats.total))
            }
        }, ms)
    })
}