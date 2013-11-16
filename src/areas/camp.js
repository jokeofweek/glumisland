(function() {
"use strict";

/**
 * This is the starting area, and eventually becomes the player's camp.
 */
function Camp() {
  Game.Area.call(this);

  this._firstEntry = true;
};
Camp.extend(Game.Area);

Camp.prototype.enter = function() {
  if (this._firstEntry) {
    this.handleFirstEnter();
    this._firstEntry = false;
  }
};

Camp.prototype.handleFirstEnter = function() {
  Game.getStoryManager().record(
    String.format("You groggily open your eyes and realize you're on a beach. You're not sure where you are. It seems to be %d.",
        Game.getTimeManager()));
};

Game.Areas.Camp = new Camp();

})();

