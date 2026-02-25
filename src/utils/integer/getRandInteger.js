export default function getRandInteger(min, max) {
    if (!Number.isFinite(min) || !Number.isFinite(max)) {
        throw new TypeError('min and max must be finite numbers')
    }

    const lowerBound = Math.ceil(Math.min(min, max))
    const upperBound = Math.floor(Math.max(min, max))

    if (lowerBound > upperBound) {
        throw new RangeError('min and max do not contain an integer range')
    }

    return Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound
}
