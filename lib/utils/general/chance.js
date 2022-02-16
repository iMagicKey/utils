module.exports = function(percent) {
    if (Math.ceil(Math.random() * 100) <= percent) {
        return true
    }

    return false
}