export default function (json) {
    try {
        if (JSON.parse(json)) return true
    } catch (e) {
        return false
    }
}
