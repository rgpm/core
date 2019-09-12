describe("nodeCrypto", () => {
    it("should import", () => {
        expect(require("../src/nodeCrypto")).toBeDefined();
    });

    it("should be a class", () => {
        const crypto = require("../src/nodeCrypto");
        expect(typeof crypto).toBe("function");
        // Classes are not callable; functions are
        expect(crypto).toThrow(TypeError);
    });

    it("should produce an object with new", () => {
        const crypto = require("../src/nodeCrypto");
        expect(new crypto()).toBeInstanceOf(Object);
    })
});

describe("nodeCrypto methods", () => {
    let cryptoLib = require("../src/nodeCrypto.js");
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
        it.each([
            ["test", "ee26b0dd4af7e749aa1a8ee3c10ae9923f618980772e473f8819a5d4940e0db27ac185f8a0e1d5f84f88bc887fd67b143732c304cc5fa9ad8e6f57f50028a8ff"],
            ["test2", "6d201beeefb589b08ef0672dac82353d0cbd9ad99e1642c83a1601f3d647bcca003257b5e8f31bdc1d73fbec84fb085c79d6e2677b7ff927e823a54e789140d9"],
            ["abcde\u00E9fgh", "574d5de3f9f5516f69921de61bcb8f864940c2cd77b8a4b7386c4e6de9859e560fa1e1e0974b573cc958f3c1de77b3fc98212f553d63108c6db756b96adecf64"],
        ])("should produce correct output", (input, output) => {
            expect(crypto.digest(input).toString("hex")).toEqual(output);
        });
    });

    describe("hmac method", () => {
        it("should throw error", () => {
            expect(() => { crypto.hmac("test") }).toThrow(notImplementedError);
        });
    });
});

