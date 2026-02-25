export default function wait(milliseconds) {
    if (!Number.isFinite(milliseconds) || milliseconds < 0) {
        throw new TypeError('milliseconds must be a non-negative number')
    }

    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds)
    })
}
