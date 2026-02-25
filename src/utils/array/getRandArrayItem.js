export default function getRandArrayItem(array) {
    if (!Array.isArray(array)) {
        throw new TypeError('array must be an array')
    }

    if (array.length === 0) {
        return undefined
    }

    return array[Math.floor(Math.random() * array.length)]
}
