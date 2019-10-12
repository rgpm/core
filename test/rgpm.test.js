describe("RGPM", () => {
    it("should import", () => {
        expect(require("../src/rgpm")).toBeDefined();
    });

    it("should be a class", () => {
        const rgpm = require("../src/rgpm");
        expect(typeof rgpm).toBe("function");
        // Classes are not callable; functions are
        expect(rgpm).toThrow(TypeError);
    });

    it("should produce an object with new", () => {
        const rgpm = require("../src/rgpm");
        expect(new rgpm()).toBeInstanceOf(Object);
    })
});

describe("RGPM methods", () => {
    let rgpm = undefined;
    beforeEach(() => {
        rgpmlib = require("../src/rgpm");
        rgpm = new rgpmlib();
    });

    describe("createRecord method", () => {
        it("should exist", () => {
            expect(rgpm.createRecord).toBeDefined();
        });
    });

    describe("updateRecord method", () => {
        it("should exist", () => {
            expect(rgpm.updateRecord).toBeDefined();
        });
    });

    describe("readRecord method", () => {
        it("should exist", () => {
            expect(rgpm.readRecord).toBeDefined();
        });
    });

    describe("deleteRecord method", () => {
        it("should exist", () => {
            expect(rgpm.deleteRecord).toBeDefined();
        });
    });
});

