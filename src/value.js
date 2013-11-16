(function() {
"use strict";

function Value() {
  this._value = null;
  this._listeners = [];
};

Value.prototype.get = function() {
  return this._value;
};

Value.prototype.set = function(value) {
  this._value = value;
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