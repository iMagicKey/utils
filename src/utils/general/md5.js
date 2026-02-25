function rotateLeft(value, shift) {
    return (value << shift) | (value >>> (32 - shift))
}

function addUnsigned(left, right) {
    const leftHigh = left & 0x80000000
    const rightHigh = right & 0x80000000
    const leftMid = left & 0x40000000
    const rightMid = right & 0x40000000
    const result = (left & 0x3fffffff) + (right & 0x3fffffff)

    if (leftMid & rightMid) {
        return result ^ 0x80000000 ^ leftHigh ^ rightHigh
    }

    if (leftMid | rightMid) {
        if (result & 0x40000000) {
            return result ^ 0xc0000000 ^ leftHigh ^ rightHigh
        }

        return result ^ 0x40000000 ^ leftHigh ^ rightHigh
    }

    return result ^ leftHigh ^ rightHigh
}

function f(x, y, z) {
    return (x & y) | (~x & z)
}

function g(x, y, z) {
    return (x & z) | (y & ~z)
}

function h(x, y, z) {
    return x ^ y ^ z
}

function i(x, y, z) {
    return y ^ (x | ~z)
}

function ff(a, b, c, d, x, s, ac) {
    return addUnsigned(rotateLeft(addUnsigned(addUnsigned(a, f(b, c, d)), addUnsigned(x, ac)), s), b)
}

function gg(a, b, c, d, x, s, ac) {
    return addUnsigned(rotateLeft(addUnsigned(addUnsigned(a, g(b, c, d)), addUnsigned(x, ac)), s), b)
}

function hh(a, b, c, d, x, s, ac) {
    return addUnsigned(rotateLeft(addUnsigned(addUnsigned(a, h(b, c, d)), addUnsigned(x, ac)), s), b)
}

function ii(a, b, c, d, x, s, ac) {
    return addUnsigned(rotateLeft(addUnsigned(addUnsigned(a, i(b, c, d)), addUnsigned(x, ac)), s), b)
}

function toWordArray(value) {
    const messageLength = value.length
    const numberOfWordsTemp1 = messageLength + 8
    const numberOfWordsTemp2 = (numberOfWordsTemp1 - (numberOfWordsTemp1 % 64)) / 64
    const numberOfWords = (numberOfWordsTemp2 + 1) * 16
    const wordArray = Array(numberOfWords - 1)
    let byteIndex = 0
    let wordIndex = 0

    while (byteIndex < messageLength) {
        wordIndex = (byteIndex - (byteIndex % 4)) / 4
        wordArray[wordIndex] = wordArray[wordIndex] || 0
        wordArray[wordIndex] |= value.charCodeAt(byteIndex) << ((byteIndex % 4) * 8)
        byteIndex += 1
    }

    wordIndex = (byteIndex - (byteIndex % 4)) / 4
    wordArray[wordIndex] = wordArray[wordIndex] || 0
    wordArray[wordIndex] |= 0x80 << ((byteIndex % 4) * 8)
    wordArray[numberOfWords - 2] = messageLength << 3
    wordArray[numberOfWords - 1] = messageLength >>> 29

    return wordArray
}

function toHex(value) {
    let word = ''

    for (let index = 0; index <= 3; index += 1) {
        const byte = (value >>> (index * 8)) & 255
        word += `0${byte.toString(16)}`.slice(-2)
    }

    return word
}

function toUtf8(value) {
    const bytes = new TextEncoder().encode(value)
    let result = ''

    for (let index = 0; index < bytes.length; index += 1) {
        result += String.fromCharCode(bytes[index])
    }

    return result
}

export default function md5(data) {
    const x = toWordArray(toUtf8(String(data)))
    let a = 0x67452301
    let b = 0xefcdab89
    let c = 0x98badcfe
    let d = 0x10325476

    for (let index = 0; index < x.length; index += 16) {
        const aOld = a
        const bOld = b
        const cOld = c
        const dOld = d

        a = ff(a, b, c, d, x[index + 0], 7, 0xd76aa478)
        d = ff(d, a, b, c, x[index + 1], 12, 0xe8c7b756)
        c = ff(c, d, a, b, x[index + 2], 17, 0x242070db)
        b = ff(b, c, d, a, x[index + 3], 22, 0xc1bdceee)
        a = ff(a, b, c, d, x[index + 4], 7, 0xf57c0faf)
        d = ff(d, a, b, c, x[index + 5], 12, 0x4787c62a)
        c = ff(c, d, a, b, x[index + 6], 17, 0xa8304613)
        b = ff(b, c, d, a, x[index + 7], 22, 0xfd469501)
        a = ff(a, b, c, d, x[index + 8], 7, 0x698098d8)
        d = ff(d, a, b, c, x[index + 9], 12, 0x8b44f7af)
        c = ff(c, d, a, b, x[index + 10], 17, 0xffff5bb1)
        b = ff(b, c, d, a, x[index + 11], 22, 0x895cd7be)
        a = ff(a, b, c, d, x[index + 12], 7, 0x6b901122)
        d = ff(d, a, b, c, x[index + 13], 12, 0xfd987193)
        c = ff(c, d, a, b, x[index + 14], 17, 0xa679438e)
        b = ff(b, c, d, a, x[index + 15], 22, 0x49b40821)

        a = gg(a, b, c, d, x[index + 1], 5, 0xf61e2562)
        d = gg(d, a, b, c, x[index + 6], 9, 0xc040b340)
        c = gg(c, d, a, b, x[index + 11], 14, 0x265e5a51)
        b = gg(b, c, d, a, x[index + 0], 20, 0xe9b6c7aa)
        a = gg(a, b, c, d, x[index + 5], 5, 0xd62f105d)
        d = gg(d, a, b, c, x[index + 10], 9, 0x02441453)
        c = gg(c, d, a, b, x[index + 15], 14, 0xd8a1e681)
        b = gg(b, c, d, a, x[index + 4], 20, 0xe7d3fbc8)
        a = gg(a, b, c, d, x[index + 9], 5, 0x21e1cde6)
        d = gg(d, a, b, c, x[index + 14], 9, 0xc33707d6)
        c = gg(c, d, a, b, x[index + 3], 14, 0xf4d50d87)
        b = gg(b, c, d, a, x[index + 8], 20, 0x455a14ed)
        a = gg(a, b, c, d, x[index + 13], 5, 0xa9e3e905)
        d = gg(d, a, b, c, x[index + 2], 9, 0xfcefa3f8)
        c = gg(c, d, a, b, x[index + 7], 14, 0x676f02d9)
        b = gg(b, c, d, a, x[index + 12], 20, 0x8d2a4c8a)

        a = hh(a, b, c, d, x[index + 5], 4, 0xfffa3942)
        d = hh(d, a, b, c, x[index + 8], 11, 0x8771f681)
        c = hh(c, d, a, b, x[index + 11], 16, 0x6d9d6122)
        b = hh(b, c, d, a, x[index + 14], 23, 0xfde5380c)
        a = hh(a, b, c, d, x[index + 1], 4, 0xa4beea44)
        d = hh(d, a, b, c, x[index + 4], 11, 0x4bdecfa9)
        c = hh(c, d, a, b, x[index + 7], 16, 0xf6bb4b60)
        b = hh(b, c, d, a, x[index + 10], 23, 0xbebfbc70)
        a = hh(a, b, c, d, x[index + 13], 4, 0x289b7ec6)
        d = hh(d, a, b, c, x[index + 0], 11, 0xeaa127fa)
        c = hh(c, d, a, b, x[index + 3], 16, 0xd4ef3085)
        b = hh(b, c, d, a, x[index + 6], 23, 0x04881d05)
        a = hh(a, b, c, d, x[index + 9], 4, 0xd9d4d039)
        d = hh(d, a, b, c, x[index + 12], 11, 0xe6db99e5)
        c = hh(c, d, a, b, x[index + 15], 16, 0x1fa27cf8)
        b = hh(b, c, d, a, x[index + 2], 23, 0xc4ac5665)

        a = ii(a, b, c, d, x[index + 0], 6, 0xf4292244)
        d = ii(d, a, b, c, x[index + 7], 10, 0x432aff97)
        c = ii(c, d, a, b, x[index + 14], 15, 0xab9423a7)
        b = ii(b, c, d, a, x[index + 5], 21, 0xfc93a039)
        a = ii(a, b, c, d, x[index + 12], 6, 0x655b59c3)
        d = ii(d, a, b, c, x[index + 3], 10, 0x8f0ccc92)
        c = ii(c, d, a, b, x[index + 10], 15, 0xffeff47d)
        b = ii(b, c, d, a, x[index + 1], 21, 0x85845dd1)
        a = ii(a, b, c, d, x[index + 8], 6, 0x6fa87e4f)
        d = ii(d, a, b, c, x[index + 15], 10, 0xfe2ce6e0)
        c = ii(c, d, a, b, x[index + 6], 15, 0xa3014314)
        b = ii(b, c, d, a, x[index + 13], 21, 0x4e0811a1)
        a = ii(a, b, c, d, x[index + 4], 6, 0xf7537e82)
        d = ii(d, a, b, c, x[index + 11], 10, 0xbd3af235)
        c = ii(c, d, a, b, x[index + 2], 15, 0x2ad7d2bb)
        b = ii(b, c, d, a, x[index + 9], 21, 0xeb86d391)

        a = addUnsigned(a, aOld)
        b = addUnsigned(b, bOld)
        c = addUnsigned(c, cOld)
        d = addUnsigned(d, dOld)
    }

    return `${toHex(a)}${toHex(b)}${toHex(c)}${toHex(d)}`.toLowerCase()
}
