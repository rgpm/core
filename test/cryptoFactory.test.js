describe("cryptoFactory", () => {
    it("should import", () => {
        expect(require("../src/cryptoFactory")).toBeDefined();
    });

    it("should be a class", () => {
        const crypto = require("../src/cryptoFactory");
        expect(typeof crypto).toBe("function");
        // Classes are not callable; functions are
        expect(crypto).toThrow(TypeError);
    });

    it("should produce an object with selectCrypto", () => {
        const crypto = require("../src/cryptoFactory");
        expect(crypto.selectCrypto()).toBeInstanceOf(Object);
    })
});

describe("cryptoFactory and crypto methods", () => {
    const cryptolib = require("../src/cryptoFactory");

    /** 
     * Used for the node tests. This will return the node 
     * crypto no matter what because it is run in the context
     * of node. The browser tests also call this, but in the 
     * context of the browser so the correct class will be 
     * returned
     **/
    let crypto = undefined; 
    beforeEach(async () => { 
        /** Used for the browser tests */
        await page.goto(PATH, { waitUntil: 'load' }) 
        crypto = cryptolib.selectCrypto();
    });

    const methodNames = [
        "digest",
        "hmac",
        "toHex",
        "null_concat"
    ];

    test.each(methodNames)("should exist", (methodName) => {
        expect(cryptolib.selectCrypto()[methodName]).toBeDefined();
    });

    describe.each([
        ["test", "ee26b0dd4af7e749aa1a8ee3c10ae9923f618980772e473f8819a5d4940e0db27ac185f8a0e1d5f84f88bc887fd67b143732c304cc5fa9ad8e6f57f50028a8ff"],
        ["test2", "6d201beeefb589b08ef0672dac82353d0cbd9ad99e1642c83a1601f3d647bcca003257b5e8f31bdc1d73fbec84fb085c79d6e2677b7ff927e823a54e789140d9"],
        ["abcde\u00E9fgh", "574d5de3f9f5516f69921de61bcb8f864940c2cd77b8a4b7386c4e6de9859e560fa1e1e0974b573cc958f3c1de77b3fc98212f553d63108c6db756b96adecf64"],
    ])("digest should produce correct output", (input, output) => {

        test("on nodejs", async () => {
            expect(crypto.toHex(await crypto.digest(input))).toEqual(output);
        });
        
        test("on browser", async () => {
            const result = await page.evaluate(async(input) => { 
                const cryptoLib = app.selectCrypto();
                return cryptoLib.toHex(await cryptoLib.digest(input));
            }, input);
            expect(result).toEqual(output);
        });
    });

    describe.each([
        ["test", "test", "9ba1f63365a6caf66e46348f43cdef956015bea997adeb06e69007ee3ff517df10fc5eb860da3d43b82c2a040c931119d2dfc6d08e253742293a868cc2d82015"],
        ["test", "test2", "8f3e4f699897645264cc0c9e6634fc9637929b932c931a4870e080ca3cfba0deb29a9573f676915ef701488ee3202d385ff03a306ce1333d5709491d73b08d62"],
        ["somekey", "abcde\u00E9fgh", "f4e91b637b90371001f53360b8a4e44aafeb1a2567a92ec7a50394a518c0aeed1d3a001540eff5f4d8dcf2d215cdf86e70cccda7daa3a0c0f4d8b6f3d68998ab"]
    ])("hmac should produce correct output", (key, message, output) => {

        test("on nodejs", async () => {
            expect(crypto.toHex(await crypto.hmac(key, message))).toEqual(output);
        });
        
        test("on browser", async () => {
            const result = await page.evaluate(async (key, message) => {    
                const cryptoLib = app.selectCrypto();
                return cryptoLib.toHex(await cryptoLib.hmac(key, message));
            }, key, message);
            expect(result).toEqual(output);
        });
    });

    describe.each([
        [["item1", "item2", "item3"], "item1\0item2\0item3"],
        [["item1", "item2", "test1", "item2", "item3", "item2", "item3", "item2", "item3"], "item1\0item2\0test1\0item2\0item3\0item2\0item3\0item2\0item3"],
        [["item1", "item2", "item3"], "item1\0item2\0item3"],
        [["test"], "test"],
        [[], ""]
    ])("null_concat should produce correct output", (items, output) => {
        
        test("on nodejs", () => {
            expect(crypto.null_concat.apply(this, items)).toEqual(output);
        });

        test("on browser", async () => {
            const result = await page.evaluate(async (items) => {    
                const cryptoLib = app.selectCrypto();
                return cryptoLib.null_concat.apply(this, items);
            }, items);
            expect(result).toEqual(output);
        });
    });
});