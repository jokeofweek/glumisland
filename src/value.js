(function() {
"use strict";

/**
 * This cass represents an observable value. It has a standard getter and setter
 * and listeners can register to be updated when the value changes.
 */
function Value() {
  Game.Observable.call(this);
  this._value = null;
};
Value.extend(Game.Observable);


Value.prototype.get = function() {
  return this._value;
};

Value.prototype.set = function(value) {
  this._value = value;
  this.notify(value);
};  

Game.Value = Value;
})();