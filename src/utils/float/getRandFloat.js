export default function getRandFloat(min, max, decimalPoint = 5) {
    if (!Number.isFinite(min) || !Number.isFinite(max)) {
        throw new TypeError('min and max must be finite numbers')
    }

    if (!Number.isInteger(decimalPoint) || decimalPoint < 0 || decimalPoint > 15) {
        throw new RangeError('decimalPoint must be an integer from 0 to 15')
    }

    const lowerBound = Math.min(min, max)
    const upperBound = Math.max(min, max)
    const factor = 10 ** decimalPoint
    const value = Math.random() * (upperBound - lowerBound) + lowerBound

    return Math.round(value * factor) / factor
}
