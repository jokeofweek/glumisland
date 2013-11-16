(function() {
"use strict";

/**
 * This cass represents an observable value. It has a standard getter and setter
 * and listeners can register to be updated when the value changes.
 */
function Value() {
  this._value = null;
  this._listeners = [];
};

Value.prototype.get = function() {
  return this._value;
};

Value.prototype.set = function(value) {
  this._value = value;
  this.notify();
};

Value.prototype.listen = function(listener) {
  this._listeners.push(listener);
};

Value.prototype.notify = function() {
  var self = this;
  this._listeners.forEach(function(listener) {
    listener.update(self, self.get());
  });
};

Game.Value = Value;
})();