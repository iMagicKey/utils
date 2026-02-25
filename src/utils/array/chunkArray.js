export default function chunkArray(array, chunkSize) {
    if (!Array.isArray(array)) {
        throw new TypeError('array must be an array')
    }

    if (!Number.isInteger(chunkSize) || chunkSize <= 0) {
        throw new TypeError('chunkSize must be a positive integer')
    }

    const result = []

    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize))
    }

    return result
}
