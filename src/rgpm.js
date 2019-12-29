"use strict"

let CryptoFactory = require('./cryptoFactory');
let NotImplementedError = require("./notImplementedError.js");
let StorageFactory = require('@rgpm/storage-integrations/src/storageFactory');

class RGPM {

    constructor()
    {
        let Crypto = CryptoFactory.selectCrypto();
        let storage =  StorageFactory.getLocalStorage();
    }
    
    createRecord() {
        throw new NotImplementedError("addRecord: Not Implemented");
    }

    readRecord() {
        throw new NotImplementedError("readRecord: Not Implemented");
    }

    updateRecord() {
        throw new NotImplementedError("updateRecord: Not Implemented");
    }

    deleteRecord() {
        throw new NotImplementedError("deleteRecord: Not Implemented");
    }
}

module.exports = RGPM;

