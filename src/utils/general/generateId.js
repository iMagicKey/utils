import getRandomBytes from './getRandomBytes.js'

export default function generateId() {
    return Array.from(getRandomBytes(16), (byte) => byte.toString(16).padStart(2, '0')).join('')
}
