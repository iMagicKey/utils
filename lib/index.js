module.exports = {
    // ARRAY
    getRandArrayItem: require('./utils/array/getRandArrayItem'),

    // FLOAT
    getRandFloat: require('./utils/float/getRandFloat'),

    // GENERAL
    chance: require('./utils/general/chance'),
    generateBigId: require('./utils/general/generateBigId'),
    generateId: require('./utils/general/generateId'),
    isJSON: require('./utils/general/isJSON'),
    shuffle: require('./utils/general/shuffle'),
    wait: require('./utils/general/wait'),
    md5: require('./utils/general/md5'),

    // INTEGER
    getRandInteger: require('./utils/integer/getRandInteger'),

    // OS
    getLocalAddress: require('./utils/os/getLocalAddress'),
    getLocalAddresses: require('./utils/os/getLocalAddresses'),
    getCPUUsage: require('./utils/os/CPUUsage'),

    // STRING
    getRandString: require('./utils/string/getRandString'),
}