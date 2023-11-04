import utils from '../src/index.js'

// ARRAY
console.log(utils.getRandArrayItem([1, 2, 3, 4, 5, 6, 7, 8, 9]))

// FLOAT
console.log(utils.getRandFloat(0, 1, 3))

// GENERAL
console.log(utils.chance(20))
console.log(utils.generateBigId())
console.log(utils.generateId())
console.log(utils.isJSON('{}'))
console.log(utils.shuffle([1, 2, 3, 4, 5, 6, 7, 8]))
console.log(utils.wait(1000))

// INTEGER
console.log(utils.getRandInteger(1, 2000))

// OS
console.log(utils.getLocalAddress())
console.log(utils.getLocalAddresses())

// STRING
console.log(utils.getRandString(2))
