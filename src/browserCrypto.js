"use strict"

let Crypto = require('./crypto.js');
let NotImplementedError = require("./notImplementedError.js");

class BrowserCrypto extends Crypto {
    constructor() {
      super(); 
    }

    /**
     * Generate the cryptographic hash (SHA512) of the input string. Taken from
     * https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest and
     * adapted to not require the async keyword
     * @param input UTF-8 encoded string
     * @returns {Array} The result of the hash
     */
    async digest(input) {
      const msgUint8 = new TextEncoder().encode(input);                             // encode as (utf-8) Uint8Array
      return await crypto.subtle.digest('sha-512', msgUint8).then(function(hashBuffer) {   // hash the message
        return Array.from(new Uint8Array(hashBuffer));                              // convert buffer to byte array
      });           
    }

    /**
     * Generate keyed hash (HMAC-SHA512)
     * @param key The key to use
     * @param message The message to hash
     * @returns {Array} The result of the hash
     */
    async hmac(key, message) {
      // Create the key (https://github.com/danharper/hmac-examples#javascript-es6)
      const keyBytes = Int8Array.from(Array.from(unescape(encodeURIComponent(key))).map(c => c.charCodeAt(0)));
      const messageBytes = Int8Array.from(Array.from(unescape(encodeURIComponent(message))).map(c => c.charCodeAt(0)));
      return await crypto.subtle.importKey("raw", keyBytes, {name: "HMAC", hash:"SHA-512"}, false, ["sign"]).then(function(cryptoKey) { 
        return crypto.subtle.sign({ "name": "HMAC" }, cryptoKey, messageBytes).then(async function(hmac) {
          return Array.from(new Uint8Array(hmac));
        });
      });
    }

    source() {
      return "browser";
    }

  }


module.exports = BrowserCrypto;