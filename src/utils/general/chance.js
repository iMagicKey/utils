export default function chance(percent) {
    if (!Number.isFinite(percent)) {
        throw new TypeError('percent must be a finite number')
    }

    if (percent <= 0) {
        return false
    }

    if (percent >= 100) {
        return true
    }

    return Math.random() * 100 < percent
}
