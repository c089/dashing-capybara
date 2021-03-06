/**
 * In-Memory storage module.
 * This is the simplest possible thing to do. For production uses, one would
 * probably prefer using something which can actually persist data, such as
 * redis and I plan implementing such a module.
 */
var data = {};

var exists = function (id) {
  return data.hasOwnProperty(id);
}
exports.exists = exists;

/** Create store with given id */
exports.create = function (id) {
  if (exists(id)) {
    throw new Error("id already exists");
  }
  data[id] = [];
};

/** Clear all data from the storage */
exports.clear = function () {
  data = {};
};

/** Set a list of data points as the value for a store, replacing all others */
exports.set = function (id, value) {
  data[id] = value;
};

/** Adds a data point to a store. */
exports.add = function (id, value) {
  data[id].push(value);
}

/** Get values for a store */
exports.get = function(id) {
  return data[id];
};

