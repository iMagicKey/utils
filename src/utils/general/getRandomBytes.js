export default function getRandomBytes(length) {
    if (!Number.isInteger(length) || length <= 0) {
        throw new TypeError('length must be a positive integer')
    }

    if (globalThis.crypto && typeof globalThis.crypto.getRandomValues === 'function') {
        return globalThis.crypto.getRandomValues(new Uint8Array(length))
    }

    const bytes = new Uint8Array(length)
    for (let index = 0; index < bytes.length; index += 1) {
        bytes[index] = Math.floor(Math.random() * 256)
    }

    return bytes
}
