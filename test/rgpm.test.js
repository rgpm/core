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
    const prml_1 = {"character_sets": [ { "name": "lowercase", "characters": ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]}, { "name": "uppercase", "characters": ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]}], "properties": { "maxLength": 23, "minLength": 5, "maxConsecutive": 3}};
    const prml_2 = {"character_sets": [ { "name": "halfnhalf", "characters": ["a","b","c","d","e","f","g","h","i","j","k","l","m", "N","O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]}], "properties": { "maxLength": 7, "minLength": 3, "maxConsecutive": 1} };
    const prml_3 = {"character_sets": [ { "name": "halfnhalf", "characters": ["a","b","c","d","e","f","g","h","i","j","k","l","m", "N","O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]}, {"name:": "numbers", "characters": ["1","2","3","4","5","6","7","8","9","0"]}]};
    const prml_4 = {"character_sets": [ { "name": "halfnhalf", "characters": ["a","b","c","d","e","f","g","h","i","j","k","l","m", "N","O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]}, {"name:": "numbers", "characters": ["1","2","3","4","5","6","7","8","9","0"]}], "properties": { "maxConsecutive": 1}};
    const service_record_1 = { "locator": "somebigurl", "identifier": "username", "iter_t": 10};
    const service_record_2 = { "locator": "google.com", "identifier": "SomeUserNameThatsPropHacked", "iter_t": 10};
    const service_record_3 = { "locator": "google.com", "identifier": "SomeUserNameThatsPropHacked", "iter_t": 10};
    const master_password = "SomeSuperDuperMasterPassword!@#123";

    beforeEach(() => {
        rgpmlib = require("../src/rgpm");
        rgpm = new rgpmlib();
    });

    describe("createRecord method", () => {
        it("should exist", () => {
            expect(rgpm.createRecord).toBeDefined();
        });

        /*it("should return a record", () => {
            expect(rgpm.createRecord(name, locator, identifier)).toEqual();
        });*/
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

    describe("getStorage method", () => {
        it("should exist", () => {
            expect(rgpm.getStorage).toBeDefined();
        });

        it("should return local storage on first initialization", () => {
            // Other tests have been used to verify that the correct
            // class is return on each supported platform. This is
            // just checking to ensure that our method of selecting 
            // storage works properly.
            expect(rgpm.getStorage().type()).toEqual("nodeStorage");
        });
    });

    describe("combineAllCharacterSets method", () => {
        it("should exist", () => {
            expect(rgpm.combineAllCharacterSets).toBeDefined();
        });

        it.each([
            [prml_1, ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ]],
            [prml_2, ["a","b","c","d","e","f","g","h","i","j","k","l","m", "N","O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ]],
            [prml_3, ["a","b","c","d","e","f","g","h","i","j","k","l","m", "N","O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1","2","3","4","5","6","7","8","9","0" ]]
        ])("should produce the correct result", (prml, output) => {
            expect(rgpm.combineAllCharacterSets(prml)).toEqual(output);
        });
    });

    describe("mapHashToPass method", () => {
        it("should exist", () => {
            expect(rgpm.mapHashToPass).toBeDefined();
        });

        hash = [
            244, 233,  27,  99, 123, 144,  55,  16,   1, 245,  51,
             96, 184, 164, 228,  74, 175, 235,  26,  37, 103, 169,
             46, 199, 165,   3, 148, 165,  24, 192, 174, 237,  29,
             58,   0,  21,  64, 239, 245, 244, 216, 220, 242, 210,
             21, 205, 248, 110, 112, 204, 205, 167, 218, 163, 160,
            192, 244, 216, 182, 243, 214, 137, 152, 171
        ];
        it.each([
            [hash, prml_1, "KjKFYMPfgRQIksMiBcCnmzt"],
            [hash, prml_2, "kjkfYmP"],
            [hash, prml_3, "3ja2ggZfg0Ocg1ce0Sije4dWhkO0X04Oh44Og4WOOSicXmikOc2OQ0P2TTVmkdlc"]
        ])("should produce the correct result", (hash, prml, output) => {
            expect(rgpm.mapHashToPass(hash, prml)).toEqual(output);
        });
    });

    describe("initPass method", () => {
        it.each([
            [service_record_1, prml_1, 0],
            [service_record_1, prml_2, 0],
            [service_record_1, prml_3, 0],
            [service_record_2, prml_1, 0],
            [service_record_2, prml_2, 0],
            [service_record_2, prml_3, 0],
            [service_record_2, prml_4, 1],
            [service_record_3, prml_1, 0],
            [service_record_3, prml_2, 0],
            [service_record_3, prml_3, 0]            
        ])("should produce the correct result", async (service_record, prml, iter_r) => {
            service_record.requirements = prml;
            await rgpm.initPass(service_record, master_password);
            expect(service_record.revision).toEqual(1);
            expect(service_record.iter_r).toEqual(iter_r);
        });
    });
});
