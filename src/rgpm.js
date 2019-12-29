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
        const Storage =  StorageFactory.getLocalStorage();
        const storageLocation = Storage.readFile("storageLocation");
        switch(storageLocation) {
            case null:
            case "localStorage":
                return Storage;
            default:
                throw new NotImplementedError("Specific Storage Location Unknown: " + storageLocation);
        }
    }

    initPass(service_record, master_password) {
        const master_key = Crypto.digest(master_password);
        const record_concat = Crypto.null_concat(service_record.locator, service_record.identifier, service_record.revision);
        const record_hashed = Crypto.digest(record_concat);

        for(let i = 0; i < service_record.iter_t; i++) {
            let record_hashed = Crypto.hmac(master_key, record_hashed);
        }
    }

    combineAllCharacterSets(requirements) {
        let characters = [];

        for(const set_index in requirements.character_sets) {
            characters = characters.concat(requirements.character_sets[set_index]["characters"]);
        }

        return characters;
    }

    mapHashToPass(hash, requirements) {
        const character_set = this.combineAllCharacterSets(requirements);

        let password = "";
        let index = 0;
        for(let i = 0; i < hash.length; i++) {
            index = (index + hash[i]) % character_set.length;
            password = password + character_set[index];
        }
        let last_index = 64;
        if (requirements.max_password_length != null) {
            last_index = Math.min(requirements.max_password_length, 64);
        }
        return password.substring(0, last_index);
    }
}

module.exports = RGPM;

