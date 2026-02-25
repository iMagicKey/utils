export default function isJSON(json) {
    if (typeof json !== 'string') {
        return false
    }

    try {
        JSON.parse(json)
        return true
    } catch {
        return false
    }
}
