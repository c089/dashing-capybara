var buster = require("buster"),
    storage = require('../../../storage/memory'),
    id = 'id';

buster.testCase("store management:", {
    setUp: function () {
        storage.clear();
    },

    "a new store can be crated": function () {
        storage.create(id);
        expect(storage.get(id)).toBeDefined();
    },

    "values can be get and set": function () {
        var value = 'value';
        storage.create(id);
        storage.set(id, value);
        expect(storage.get(id).length).toBe(1);
        expect(storage.get(id)).toContain(value);
    },

    "set overwrites the previous values": function () {
        var firstValue = '1',
            secondValue = '2';
        storage.create(id);
        storage.set(id, firstValue);
        storage.set(id, secondValue);
        expect(storage.get(id)).not.toContain(firstValue);
        expect(storage.get(id)).toContain(secondValue);
    },

    "add adds values": function () {
        var firstValue = '1',
            secondValue = '2';
        storage.create(id);
        storage.add(id, firstValue);
        storage.add(id, secondValue);
        expect(storage.get(id)).toContain(firstValue);
        expect(storage.get(id)).toContain(secondValue);
    },

    "a stores data can be clared": function () {
        storage.create(id);
        storage.set(id, 'value');
        storage.clear();
        expect(storage.get(id)).not.toBeDefined();
    },

    "a store cannot be created twice": function () {
        var createCallback = function () { storage.create(id) };
        expect(createCallback).not.toThrow();
        expect(createCallback).toThrow();
    },

    "can check if store does not exist": function () {
        expect(storage.exists(id)).toBe(false);
    },

    "can check if store exists": function () {
        storage.create(id);
        expect(storage.exists(id)).toBe(true);
    }


});
