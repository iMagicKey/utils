export default function (miliseconds) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, miliseconds)
    })
}
