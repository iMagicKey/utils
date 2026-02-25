import getRandArrayItem from './utils/array/getRandArrayItem.js'
import chunkArray from './utils/array/chunkArray.js'
import getRandFloat from './utils/float/getRandFloat.js'
import chance from './utils/general/chance.js'
import generateBigId from './utils/general/generateBigId.js'
import generateId from './utils/general/generateId.js'
import isJSON from './utils/general/isJSON.js'
import shuffle from './utils/general/shuffle.js'
import wait from './utils/general/wait.js'
import md5 from './utils/general/md5.js'
import getRandInteger from './utils/integer/getRandInteger.js'
import getRandString from './utils/string/getRandString.js'

const getRandomArrayItem = getRandArrayItem
const getRandomFloat = getRandFloat
const getRandomInteger = getRandInteger
const getRandomString = getRandString
const generateUuidV4 = generateBigId
const generateHexId = generateId

const sharedUtils = {
    getRandArrayItem,
    chunkArray,
    getRandFloat,
    chance,
    generateBigId,
    generateId,
    isJSON,
    shuffle,
    wait,
    md5,
    getRandInteger,
    getRandString,
    getRandomArrayItem,
    getRandomFloat,
    getRandomInteger,
    getRandomString,
    generateUuidV4,
    generateHexId,
}

export {
    getRandArrayItem,
    chunkArray,
    getRandFloat,
    chance,
    generateBigId,
    generateId,
    isJSON,
    shuffle,
    wait,
    md5,
    getRandInteger,
    getRandString,
    getRandomArrayItem,
    getRandomFloat,
    getRandomInteger,
    getRandomString,
    generateUuidV4,
    generateHexId,
}

export default sharedUtils
