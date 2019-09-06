"use strict"

let NotImplementedError = require("./notImplementedError.js");

class Crypto {
    constructor() {
        
    }

    /**
     * Generate the cryptographic hash of the input string.
     * Actual implementations for each crypto source are in their respected classes
     * @param input UTF-8 encoded string
     * @returns {Buffer} The result of the hash
     */
    digest(input) {
        throw new NotImplementedError(`The method 'hmac' has not been implemented. This is more of an error of inproper subclassing.`);
    }

    /**
     * Generate keyed hash (HMAC-SHA512)
     * @param key The key to use
     * @param message The message to hash
     * @returns {Buffer} The result of the hash
     */
    hmac(key, message) {
        throw new NotImplementedError(`The method 'hmac' has not been implemented. This is more of an error of inproper subclassing.`);
    }

    null_concat() {
        throw new NotImplementedError("null_concat has not been implemented yet");
    }

    verify() { 
        throw new NotImplementedError("verify has not been implemented yet");
    }
}


module.exports = Crypto;

