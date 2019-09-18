"use strict"

let BrowserCrypto = require('./browserCrypto.js');
let NodeCrypto= require('./nodeCrypto.js');
let NotImplementedError = require("./notImplementedError.js");


class CryptoFactory {

    /**
     * Creates the proper crypto subclass to use for the platform
     * @return {Crypto} The crypto class
     */
    static selectCrypto() {
        /* Standard WebCrypto */
        try {
            if (crypto.subtle !== undefined) {
                return new BrowserCrypto();
            }
        } catch (e) { }

        /* Node crypto */
        try {
            require('crypto');
            return new NodeCrypto();
        } catch (e) { }

        /* If no sources are available, bail out */
        throw new NotImplementedError("selectCrypto: No crypto sources found");
    }
}

module.exports = CryptoFactory;

