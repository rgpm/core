"use strict"

let NotImplementedError = require("./notImplementedError.js");

class Crypto {
    /**
     * Generate the cryptographic hash of the input string.
     * Actual implementations for each crypto source are in their respective classes
     * @param {string} input UTF-8 encoded string
     * @returns {Array} The result of the hash
     */
    async digest(input) {
        throw new NotImplementedError(`The method 'digest' has not been implemented. This is more of an error of inproper subclassing.`);
    }

    /**
     * Generate keyed hash (HMAC-SHA512)
     * @param {string} key  The key to use
     * @param {string} message The message to hash
     * @returns {Array} The result of the hash
     */
    async hmac(key, message) {
        throw new NotImplementedError(`The method 'hmac' has not been implemented. This is more of an error of inproper subclassing.`);
    }

    /**
     * The NULL-CONCAT(...) function returns a byte sequence created by
     * concatenating its inputs with null bytes between, as done by Yee and
     * Sitaker (2006). ~ Schmittle, 2018
     * @param {Array} args A list of string arguments to concat together 
     * @returns {Array} The result of the concat operation as a string
     */
    null_concat(... args) {
        let result = "";
        for (let arg of args) {
            result += arg + "\0";
        }

        // Remove the last null byte from the string
        return result.substring(0, result.length - 1);
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

