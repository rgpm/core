"use strict"

class Crypto {
    constructor() {
        this.selectCrypto();
    }

    selectCrypto() {
        /* Standard WebCrypto */
        try {
            if (crypto.subtle !== undefined) {
                Crypto.source = "webcrypto";
                return;
            }
        } catch (e) { }

        /* Node crypto */
        try {
            require('crypto');
            Crypto.source = "node";
            return;
        } catch (e) { }

        /* If no sources are available, bail out */
        throw Error("No crypto sources found");
    }

    /**
     * Generate the cryptographic hash of the input string.
     * Actual implementations for each crypto source are digest__"source name".
     * @param input UTF-8 encoded string
     * @returns {Buffer} The result of the hash
     */
    digest(input) {
        let methodName = `digest__${Crypto.source}`;
        if (methodName in this) {
            return this[methodName](input);
        } else {
            throw new NotImplementedError(`The method 'digest' has not been implemented for the crypto source '${Crypto.source}'`);
        }
    }

    digest__node(input) {
        const crypto = require("crypto");
        let hash = crypto.createHash("sha512");
        hash.update(input);
        return hash.digest();
    }

    hmac() {
        let methodName = `hmac__${Crypto.source}`;
        if (methodName in this) {
            return this[methodName]();
        } else {
            throw new NotImplementedError(`The method 'hmac' has not been implemented for the crypto source '${Crypto.source}'`);
        }
    }
}

/* Class variables */
Crypto.source = undefined;

class NotImplementedError extends Error {
    constructor(message) {
        super();
        this.name = "NotImplementedError";
        this.message = message;
    }
}
Crypto.NotImplementedError = NotImplementedError;

module.exports = Crypto;

