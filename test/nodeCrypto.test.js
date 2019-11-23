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

