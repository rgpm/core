"use strict"

let CryptoFactory = require('./cryptoFactory');
let NotImplementedError = require("./notImplementedError.js");


class RGPM {

    constructor()
    {
        let Crypto = CryptoFactory.selectCrypto();
    }
    
    addRecord() {
        throw new NotImplementedError("addRecord: Not Implemented");
    }
}

module.exports = RGPM;

