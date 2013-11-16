(function() {
"use strict";

/**
 * This basic class represents an object which other classes can listen for events.
 * The class can raise events, which will be sent to all listeners.
 */
function Observable() {
  this._listeners = [];
};

/**
 * Adds a listener to this object.
 * @param  {function} listener A function to be called when this object raises events.
 */
Observable.prototype.listen = function(listener) {
  this._listeners.push(listener);
};

/**
 * Notifies all listeners. A listener will be called with this Observable
 * object as the first argument and all other passed arguments.
 *
 * eg. given a listener, this.notify(1, 2) will invoke listener(this, 1, 2).
 */
Observable.prototype.notify = function() {
  var self = this;
  var args =  Array.prototype.slice.call(arguments);
  args.unshift(this);
  this._listeners.forEach(function(listener) {
    listener.apply(listener, args);
  });
};

Game.Observable = Observable;

})();