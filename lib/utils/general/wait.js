module.exports = function (miliseconds) {
    return new Promise(resolve => {
        setTimeout(() => { resolve() }, miliseconds)
    })
}