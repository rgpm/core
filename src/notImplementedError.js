"use strict"

class NotImplementedError extends Error {
    constructor(message) {
        super();
        this.name = "NotImplementedError";
        this.message = message;
    }
}

module.exports = NotImplementedError;