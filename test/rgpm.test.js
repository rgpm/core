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

    beforeEach(async () => {
        rgpmlib = require("../src/rgpm");
        rgpm = new rgpmlib();

        this.name = "Google";
        this.locator = "google.com";
        this.identifier = "gmailAccountName";
        this.iter_t = 10;
        this.service_record = await rgpm.createRecord(this.name, this.locator, this.identifier, this.iter_t, master_password, prml_1);
    });

    describe("createRecord method", () => {
        it("should exist", () => {
            expect(rgpm.createRecord).toBeDefined();
        });

        it("should return a record", () => {
            expect(this.service_record.name).toEqual(this.name);
            expect(this.service_record.locator).toEqual(this.locator);
            expect(this.service_record.identifier).toEqual(this.identifier);
            expect(this.service_record.uuid).toBeDefined();
            expect(this.service_record.iter_t).toEqual(this.iter_t);
            expect(this.service_record.revision).toEqual(1);
        });
    });

    describe("updateRecord method", () => {
        it("should exist", () => {
            expect(rgpm.updateRecord).toBeDefined();
        });

        it("should update a record", () => {
            this.service_record.name = "Microsoft";
            rgpm.updateRecord(this.service_record);
            expect(rgpm.readRecord(this.service_record.uuid).name).toEqual("Microsoft");
        });
    });

    describe("readRecord method", () => {
        it("should exist", () => {
            expect(rgpm.readRecord).toBeDefined();
        });

        it("should read a record", () => {
            const record = rgpm.readRecord(this.service_record.uuid);
            expect(record.name).toEqual(this.name);
            expect(record.locator).toEqual(this.locator);
            expect(record.identifier).toEqual(this.identifier);
        });

        it("should return null when a record doesn't exist", () => {
            expect(rgpm.readRecord("NotaUUID")).toBeNull();
        });
    });

    describe("deleteRecord method", () => {
        it("should exist", () => {
            expect(rgpm.deleteRecord).toBeDefined();
        });

        it("should delete a record", () => {
            const countBeforeDeletion = rgpm.listRecords()["records"].length;
            rgpm.deleteRecord(this.service_record.uuid);
            expect(rgpm.readRecord(this.service_record.uuid)).toBeNull();
            expect(rgpm.listRecords()["records"].length).toEqual(countBeforeDeletion - 1);
        });
    });

    describe("listRecords method", () => {
        it("should exist", () => {
            expect(rgpm.listRecords).toBeDefined();
        });

        it("should return a record", () => {
            expect(rgpm.listRecords()["records"].length).toBeDefined(); //Due to how the tests are running, we don't know the correct value of records
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

    describe("genPass method", () => {
        it.each([
            [service_record_1, prml_1, "dTrQvhUmkxkyTYtkHDaoVUh"],
            [service_record_1, prml_2, "dTRQVhU"],
            [service_record_1, prml_3, "TRVcjhca50O3jOl9RfiOlcl197kXkhfNY19f3kNTUmcZ8mUXjOdOd9hi7Te4W6ZY"],
            [service_record_2, prml_1, "jclqEpLbMOBbXIefaeDmFKn"],
            [service_record_2, prml_2, "jclQePl"],
            [service_record_2, prml_3, "bgP7kh4bOmlbZWYfQUVa0Ujl2349blmlW0RkmdeROObbRb0j0T120TQd2Z1meRdm"],
            [service_record_2, prml_4, "Wd0RiUi5OWdQO80YWfPfg2SXYddYc3Wcm6aR3WR2STQ9bib5lgfm9lmflRkhSQOl"],
            [service_record_3, prml_1, "jclqEpLbMOBbXIefaeDmFKn"],
            [service_record_3, prml_2, "jclQePl"],
            [service_record_3, prml_3, "bgP7kh4bOmlbZWYfQUVa0Ujl2349blmlW0RkmdeROObbRb0j0T120TQd2Z1meRdm"]            
        ])("should produce the correct result", async (service_record, prml, output) => {
            // Setup the service record
            service_record.requirements = prml;
            await rgpm.initPass(service_record, master_password);

            //Test the password generation
            expect(await rgpm.genPass(service_record, master_password)).toEqual(output);
        });
    });
});
