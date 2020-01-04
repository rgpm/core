"use strict"

const CryptoFactory = require('./cryptoFactory');
const NotImplementedError = require("./notImplementedError.js");
const StorageFactory = require('@rgpm/storage-integrations/src/storageFactory');
const uuidv1 = require('uuid/v1'); //Uses timestamp for uuid
const uuidListFilename = "uuidList";
class RGPM {

    constructor()
    {
        this.Crypto = CryptoFactory.selectCrypto();
        this.Storage =  this.getStorage();
    }
    
    async createRecord(name, locator, identifier, master_password, requirements) {
        // Create the service record
        const record_uuid = uuidv1();
        const service_record = { 
            "name": name,
            "uuid": record_uuid,
            "locator": locator,
            "identifier": identifier,
            "requirements": requirements
        };

        // Initialize the service record
        await this.initPass(service_record, master_password);

        // Store the service record
        this.Storage.createFile(record_uuid);
        this.updateRecord(service_record);

        // Add the service record uuid to the list
        let records = this.listRecords();
        if(records == null) {
            records = {"records": [record_uuid]};
        } else {
            records["records"].push(record_uuid)
        }
        this.Storage.updateFile(uuidListFilename, JSON.stringify(records));

        return service_record;
    }

    readRecord(uuid) {
        return JSON.parse(this.Storage.readFile(uuid));
    }

    updateRecord(service_record) {
        this.Storage.updateFile(service_record.uuid, JSON.stringify(service_record));
    }

    deleteRecord(uuid) {
        // Delete the record from the list 
        let records = this.listRecords();
        records["records"].splice(records["records"].indexOf(uuid), 1);
        this.Storage.updateFile(uuidListFilename, JSON.stringify(records));

        this.Storage.deleteFile(uuid);
    }

    listRecords() {
        // Have a list of all uuid inside one file
        return JSON.parse(this.Storage.readFile(uuidListFilename));
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

    /**
     * Generates a password based on the service record and master password
     * @param {JSON} service_record 
     * @param {String} master_password 
     */
    async genPass(service_record, master_password) {
        const master_key = await this.Crypto.digest(master_password);
        const record_concat = this.Crypto.null_concat(service_record.locator, service_record.identifier, service_record.revision);
        let record_hashed = await this.Crypto.digest(record_concat);

        const num_iterations = service_record.iter_r + service_record.iter_t;

        for(let i = 0; i < num_iterations; i++) {
            record_hashed = await this.Crypto.hmac(master_key, record_hashed);
        }

        return this.mapHashToPass(record_hashed, service_record.requirements);
    }

    /**
     * Calculates iter_r for the specified service record and master password
     * @param {JSON} service_record 
     * @param {String} master_password 
     */
    async initPass(service_record, master_password) {
        const master_key = await this.Crypto.digest(master_password);
        service_record.revision = 1;
        const record_concat = this.Crypto.null_concat(service_record.locator, service_record.identifier, service_record.revision);
        let record_hashed = await this.Crypto.digest(record_concat);

        for(let i = 0; i < service_record.iter_t; i++) {
            record_hashed = await this.Crypto.hmac(master_key, record_hashed);
        }

        let password = this.mapHashToPass(record_hashed, service_record.requirements);
        let meets_requirements = this.verify(password, service_record.requirements);
        let iter_r = 0;
        while (meets_requirements == false) {
            record_hashed = this.Crypto.hmac(master_password, record_hashed);
            iter_r = iter_r + 1;
            password = this.mapHashToPass(record_hashed, service_record.requirements);
            meets_requirements = this.verify(password, service_record.requirements);
        }
        service_record.iter_r = iter_r;
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

