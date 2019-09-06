"use strict"

let Crypto = require('./crypto.js');
let BroswerCrypto = require('./browserCrypto.js');
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
                console.log("selectCrypto: Browser Crypto Selected");
                return new BroswerCrypto();
            }
        } catch (e) { }

        /* Node crypto */
        try {
            require('crypto');
            console.log("selectCrypto: NodeJS Crypto Selected");
            return new NodeCrypto();
        } catch (e) { }

        /* If no sources are available, bail out */
        throw Error("selectCrypto: No crypto sources found");
    }

    addRecord() {
        throw new NotImplementedError("addRecord: Not Implemented");
    }
}

module.exports = CryptoFactory;

