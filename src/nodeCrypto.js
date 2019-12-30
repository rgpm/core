"use strict"

let Crypto = require('./crypto.js');
let NotImplementedError = require("./notImplementedError.js");


class NodeCrypto extends Crypto {
    constructor() {
      super();
      // Determine if crypto is available
      // https://nodejs.org/api/all.html#crypto_determining_if_crypto_support_is_unavailable
      try {
        this.crypto = require("crypto");
      } catch (err) {
        this.crypto = null;
        throw new NotImplementedError("NodeJS Crypto has not been implemented")
      }
    }
  
    /**
     * Generate the cryptographic hash (SHA512) of the input string
     * @param {string} input UTF-8 encoded string
     * @returns {ArrayBuffer} The result of the hash
     */
    async digest(input) {
      const hash = this.crypto.createHash("sha512");
      hash.update(input);
      return new Uint8Array(hash.digest());
    }

    /**
     * Generate keyed hash (HMAC-SHA512)
     * @param {string} key The key to use
     * @param {string} message The message to hash
     * @returns {ArrayBuffer} The result of the hash
     */
    async hmac(key, message) {
      const hmac = this.crypto.createHmac('sha512', key)
      hmac.update(message);
      return new Uint8Array(hmac.digest());
    }

    /**
     * Convert a buffer to an arraybuffer
     * @param {Buffer} buf 
     */
    toArrayBuffer(buf) {
      let ret = new ArrayBuffer(buf.length);
      for(var i = 0; i < buf.length; i++) {
        ret[i] = buf[i];
      }
      return ret;
    }

    /**
     * Returns the source of the crypto
     * @returns {String} 
     */
    source() {
      return "node";
    }
  }

module.exports = NodeCrypto;
