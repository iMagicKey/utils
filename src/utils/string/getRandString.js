export default function getRandString(length = 16, charSet) {
    if (!Number.isInteger(length) || length < 0) {
        throw new TypeError('length must be a non-negative integer')
    }

    const normalizedCharSet = charSet === undefined ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' : charSet
    if (typeof normalizedCharSet !== 'string' || normalizedCharSet.length === 0) {
        throw new TypeError('charSet must be a non-empty string')
    }

    const result = []
    for (let index = 0; index < length; index += 1) {
        result.push(normalizedCharSet[Math.floor(Math.random() * normalizedCharSet.length)])
    }

    return result.join('')
}
