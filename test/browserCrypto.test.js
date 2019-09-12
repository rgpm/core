describe("browserCrypto", () => {
    it("should import", () => {
        expect(require("../src/browserCrypto")).toBeDefined();
    });

    it("should be a class", () => {
        const crypto = require("../src/browserCrypto");
        expect(typeof crypto).toBe("function");
        // Classes are not callable; functions are
        expect(crypto).toThrow(TypeError);
    });

    it("should produce an object with new", () => {
        const crypto = require("../src/browserCrypto");
        expect(new crypto()).toBeInstanceOf(Object);
    })
});

describe("browserCrypto methods", () => {
    let cryptoLib = require("../src/browserCrypto.js");
    let notImplementedError = require("../src/notImplementedError");
    let crypto = new cryptoLib();
    let methodNames = [
        "digest",
        "hmac",
    ];

    test.each(methodNames)("should exist", (methodName) => {
        expect(crypto[methodName]).toBeDefined();
    });


    describe("digest method", () => {
        it("should throw error", () => {
            expect(() => { crypto.digest("test") }).toThrow(notImplementedError);
        });
    });

    describe("hmac method", () => {
        it("should throw error", () => {
            expect(() => { crypto.hmac("test") }).toThrow(notImplementedError);
        });
    });
});

