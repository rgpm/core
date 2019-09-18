"use strict"

let NotImplementedError = require("./notImplementedError.js");

class Crypto {
    /**
     * Generate the cryptographic hash of the input string.
     * Actual implementations for each crypto source are in their respected classes
     * @param input UTF-8 encoded string
     * @returns {Array} The result of the hash
     */
    async digest(input) {
        throw new NotImplementedError(`The method 'digest' has not been implemented. This is more of an error of inproper subclassing.`);
    }

    /**
     * Generate keyed hash (HMAC-SHA512)
     * @param key The key to use
     * @param message The message to hash
     * @returns {Array} The result of the hash
     */
    async hmac(key, message) {
        throw new NotImplementedError(`The method 'hmac' has not been implemented. This is more of an error of inproper subclassing.`);
    }

    null_concat() {
        throw new NotImplementedError("null_concat has not been implemented yet");
    }

    verify() { 
        throw new NotImplementedError("verify has not been implemented yet");
    }

    /**
     * Returns the source of the crypto
     * @returns {String} 
     */
    source() {
        throw new NotImplementedError("The method `source` has not been implemented yet. This is more of an error of inproper subclassing."); 
    }

    /**
     * Converts a buffer to the hex representation
     * https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
     * @param {Array} buffer 
     * @returns {String} The hex representation
     */
    toHex(buffer) {
        return buffer.map(b => b.toString(16).padStart(2, '0')).join('');        // convert bytes to hex string
    }
}


module.exports = Crypto;

