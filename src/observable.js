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
  this._internalListen(event, listener, false);
};

/**
 * Adds a listener to this object. This listener will be called once and then
 * removed.
 *   
 * @param {string} event The event to listen for.
 * @param  {function} listener A function to be called when this object raises events.
 */
Observable.prototype.listenOnce = function(event, listener) {
  this._internalListen(event, listener, true);
};

Observable.prototype._internalListen = function(event, listener, once) {
  if (!this._listeners[event]) {
    this._listeners[event] = [];
  }
  this._listeners[event].push({
    listener: listener,
    once: once
  });
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

  for (var i = 0; i < this._listeners[event].length; i++) {
    this._listeners[event][i].listener.call(null, arg);
    // Remove the listener if it was marked for listening only once.
    if (this._listeners[event][i].once) {
      this._listeners[event].splice(i, 1);
      i--;
    }
  }

  // Delete the event if there are no keys left
  if (this._listeners[event].length == 0) {
    delete this._listeners[event];
  }
};

Game.Observable = Observable;

})();