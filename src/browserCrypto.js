"use strict"

let Crypto = require('./crypto.js');
let NotImplementedError = require("./notImplementedError.js");

class BrowserCrypto extends Crypto {
    constructor() {
      super(); 
    }

    /**
     * Generate the cryptographic hash (SHA512) of the input string
     * @param input UTF-8 encoded string
     * @returns {Buffer} The result of the hash
     */
    digest(input) {
        throw new NotImplementedError(`The method 'digest' has not been implemented for Browser Crypto Class`);
    }

    /**
     * Generate keyed hash (HMAC-SHA512)
     * @param key The key to use
     * @param message The message to hash
     * @returns {Buffer} The result of the hash
     */
    hmac(key, message) {
        throw new NotImplementedError(`The method 'hmac' has not been implemented in Browser Crypto Class`);
    }

  }


  module.exports = BrowserCrypto;