var buster = require("buster"),
    routesModule = require('../../../routes/data'),
    storage,
    routes,
    fakeReq = {},
    fakeRes;

buster.testCase("data endpoints", {
    setUp: function () {
        fakeRes = {
            status: this.stub().returns({
                send: this.stub()
            }),
        };
        storage = {
            create: this.spy(),
            clear: this.spy(),
            set: this.spy(),
            add: this.spy(),
            get: this.spy()
        };
        routes = routesModule({storage: storage});
    },

    "create should crate a store": function () {
        routes.create(fakeReq, fakeRes);
        expect(storage.create).toHaveBeenCalledOnce();
    },

    "put_id should replace the value on the store": function () {
        var id = 'foo';
        fakeReq.params = { id : id };
        fakeReq.body = { value: 'thevalue' };
        routes.put_id(fakeReq, fakeRes);
        expect(storage.set).toHaveBeenCalledOnce();
        expect(storage.set).toHaveBeenCalledWith(id, fakeReq.body);
    },

    "post_id should add a value on the store": function () {
        var id = 'foo';
        fakeReq.params = { id : id };
        fakeReq.body = { value: 'thevalue' };
        routes.post_id(fakeReq, fakeRes);
        expect(storage.add).toHaveBeenCalledOnce();
        expect(storage.add).toHaveBeenCalledWith(id, fakeReq.body);
    },

    "get_by_id should return the values from the store": function () {
        var id = 'foo',
            fakeValue = [{v:1}];
        storage.get = this.stub().returns(fakeValue);
        routes.get_by_id(fakeReq, fakeRes, id);
        expect(storage.get).toHaveBeenCalledOnce();
        expect(storage.get).toHaveBeenCalledWith(id);
        expect(fakeRes.status).toHaveBeenCalledWith(200);
        expect(fakeRes.status().send).toHaveBeenCalledWith(fakeValue);
    }

});
