export default function shuffle(variable) {
    if (!Array.isArray(variable)) {
        throw new TypeError('variable must be an array')
    }

    const result = [ ...variable ]

    for (let index = result.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1))
        ;[result[index], result[randomIndex]] = [result[randomIndex], result[index]]
    }

    return result
}
