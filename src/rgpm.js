"use strict"

let CryptoFactory = require('./cryptoFactory');
let NotImplementedError = require("./notImplementedError.js");
let StorageFactory = require('@rgpm/storage-integrations/src/storageFactory');

class RGPM {

    constructor()
    {
        const Crypto = CryptoFactory.selectCrypto();
        let Storage =  this.getStorage();
    }
    
    createRecord(name, locator, identifier, requirements) {
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

    /**
     * Checks if the password is acceptable within the PRML.
     * Supports Max Consecutive, Min/Max length
     * @param {String} password 
     * @param {JSON} prml 
     */
    verify(password, prml) { 

        // If there are no properties to verify, then it should pass.
        if(prml.properties == null) {
            return true;
        }
        if(prml.properties.minLength != null) {
            if(password.length < prml.properties.minLength) {
                return false;
            }
        }
        if(prml.properties.maxLength != null) {
            if(password.length > prml.properties.maxLength) {
                return false;
            }
        }
        if(prml.properties.maxConsecutive != null) {
            let repeat_count = 0;
            let repeat_char = '';
            for(let c of password) {
                if(c == repeat_char) {
                    repeat_count++;
                } else {
                    repeat_char = c;
                    repeat_count = 1;
                }
                if(repeat_count > prml.properties.maxConsecutive) {
                    return false;
                }
            }
        }
        return true;
    }

    initPass(service_record, master_password) {
        const master_key = Crypto.digest(master_password);
        const record_concat = Crypto.null_concat(service_record.locator, service_record.identifier, service_record.revision);
        const record_hashed = Crypto.digest(record_concat);

        for(let i = 0; i < service_record.iter_t; i++) {
            let record_hashed = Crypto.hmac(master_key, record_hashed);
        }

        let password = this.mapHashToPass(record_hashed, service_record.requirements);
        let meets_requirements = Crypto.verify(password, service_record.requirements);

    }

    combineAllCharacterSets(requirements) {
        let characters = [];

        for(const set of requirements.character_sets) {
            characters = characters.concat(set["characters"]);
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
        if (requirements.properties != null && requirements.properties.maxLength != null) {
            last_index = Math.min(requirements.properties.maxLength, 64);
        }
        return password.substring(0, last_index);
    }
}

module.exports = RGPM;

