"use strict"

let Crypto = require('./crypto.js');
let NotImplementedError = require("./notImplementedError.js");


class RGPM {
    addRecord() {
        throw new NotImplementedError("addRecord: Not Implemented");
    }
}

module.exports = RGPM;

