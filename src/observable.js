(function() {
"use strict";

/**
 * This basic class represents an object which other classes can listen for events.
 * The class can raise events, which will be sent to all listeners.
 */
function Observable() {
  this._listeners = {};
};

/**
 * Adds a listener to this object.
 * @param {string} event The event to listen for.
 * @param  {function} listener A function to be called when this object raises events.
 */
Observable.prototype.listen = function(event, listener) {
  if (!this._listeners[event]) {
    this._listeners[event] = [];
  }
  this._listeners[event].push(listener);
};

/**
 * Notifies all listeners for a given event type.
 * @param {string} event The event to raise.
 * @param {?} arg An optional argument to pass to listeners.
 */
Observable.prototype.raise = function(event, arg) {
  // Make sure we have some listeners.
  if (!this._listeners[event]) {
    return;
  }
  this._listeners[event].forEach(function(listener) {
    listener.call(listener, arg);
  });
};

Game.Observable = Observable;

})();