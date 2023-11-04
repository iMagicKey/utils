export default function () {
    return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (e) {
        let t = (16 * Math.random()) | 0
        return ('x' === e ? t : (3 & t) | 8).toString(16)
    })
}
