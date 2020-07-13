var CryptoJS = require("crypto-js")

let util = {}

/**
 * Encrypta texto y devuelve el hash.
 * 
 * @param {string} text texto a encryptar.
 */
util.encrypt = (text) => {
    return CryptoJS.AES.encrypt(typeof(text) == 'object' ? JSON.stringify(text) : text, process.env.CRYPTO_SECRET).toString()
}

/**
 * Desencripta un texto encriptado previamente.
 * 
 * @param {string} hash texto encryptado.
 */
util.decrypt = (hash) => {
    const bytes = CryptoJS.AES.decrypt(hash, process.env.CRYPTO_SECRET)
    try {
        let result = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        return result
    } catch(err) {
        return bytes.toString(CryptoJS.enc.Utf8)
    }
    
}

module.exports = util