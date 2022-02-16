module.exports = function(min, max, decimalPoint = 5) {
    let nums = [1,2,3,4,5,6,7,8,9];
    let numString = '';
    for (let i = 0; i < decimalPoint; i++) {
        numString += Math.floor(Math.random() * nums.length);
    }
    return parseFloat(`${this.getRandInteger(min, max)}.${numString})}`)
}