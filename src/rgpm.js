"use strict"

let CryptoFactory = require('./cryptoFactory');
let NotImplementedError = require("./notImplementedError.js");
let StorageFactory = require('@rgpm/storage-integrations/src/storageFactory');

class RGPM {

    constructor()
    {
        let Crypto = CryptoFactory.selectCrypto();
        let Storage =  this.getStorage();
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

    getStorage() {
        let Storage =  StorageFactory.getLocalStorage();
        let storageLocation = Storage.readFile("storageLocation");
        switch(storageLocation) {
            case null:
            case "localStorage":
                return Storage;
            default:
                throw new NotImplementedError("Specific Storage Location Unknown: " + storageLocation);
        }
    }
}

module.exports = RGPM;

