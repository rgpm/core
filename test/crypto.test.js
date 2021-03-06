describe("crypto", () => {
    it("should import", () => {
        expect(require("../src/crypto")).toBeDefined();
    });

    it("should be a class", () => {
        const crypto = require("../src/crypto");
        expect(typeof crypto).toBe("function");
        // Classes are not callable; functions are
        expect(crypto).toThrow(TypeError);
    });

    it("should produce an object with new", () => {
        const crypto = require("../src/crypto");
        expect(new crypto()).toBeInstanceOf(Object);
    })
});

describe("crypto methods", () => {
    let notImplementedError = require("../src/notImplementedError");
    let cryptoLib = require("../src/crypto");
    let crypto = new cryptoLib();
  

    let methodNames = [
        "digest",
        "hmac",
        "null_concat",
        "verify",
        "source",
    ];

    test.each(methodNames)("should exist", (methodName) => {
        expect(crypto[methodName]).toBeDefined();
    });


    describe("digest method", () => {
        it("should throw error", async () => {
            await expect(crypto.digest("test")).rejects.toThrowError();
        });
    });

    describe("hmac method", () => {
        it("should throw error", async () => {
            await expect(crypto.hmac("test", "test")).rejects.toThrowError();
        });
    });

    describe("null_concat method", () => {
        it("should throw error", () => {
            expect(() => { crypto.null_concat() }).toThrow(notImplementedError);
        });
    });

    describe("verify method", () => {
        it("should throw error", () => {
            expect(() => { crypto.verify() }).toThrow(notImplementedError);
        });
    });

    describe("source method", () => {
        it("should throw error", () => {
            expect(() => { crypto.source() }).toThrow(notImplementedError);
        });
    });
});

