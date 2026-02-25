import os from 'node:os'

function sampleCPUInfo() {
    const stats = os.cpus().map((cpu) => {
        return {
            total: cpu.times.user + cpu.times.nice + cpu.times.sys + cpu.times.idle + cpu.times.irq,
            idle: cpu.times.idle,
        }
    })

    return stats.reduce(
        (accumulator, current) => {
            return {
                total: accumulator.total + current.total,
                idle: accumulator.idle + current.idle,
            }
        },
        { total: 0, idle: 0 }
    )
}

export default function getCPUUsage(ms = 1000, free = false) {
    if (!Number.isFinite(ms) || ms < 0) {
        throw new TypeError('ms must be a non-negative number')
    }

    return new Promise((resolve) => {
        const startStats = sampleCPUInfo()

        setTimeout(() => {
            const endStats = sampleCPUInfo()
            const totalDelta = endStats.total - startStats.total
            const idleDelta = endStats.idle - startStats.idle
            const idleRatio = totalDelta === 0 ? 0 : idleDelta / totalDelta
            resolve(free ? idleRatio : 1 - idleRatio)
        }, ms)
    })
}
