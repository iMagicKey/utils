module.exports = function(length = 16, charSet) {
    var result = []
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  
    while (length--) {
      result.push(charSet[Math.floor(Math.random() * charSet.length)])
    }
    
    return result.join('')
  }