(function() {
"use strict";

/**
 * Represents the current player's game state.
 */
function State() {
  this._area = null;
};

/**
 * Changes the area that the player is currently in.
 * @param  {Game.Area} newArea The new area to switch to.
 */
State.prototype.switchArea = function(newArea) {
  // Leave old area
  if (this._area) {
    this._area.leave();
  }
  // Join new area
  this._area = newArea;
  this._area.enter();
};

Game.State = State;

})();