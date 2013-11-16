(function() {
"use strict";

/**
 * This interface represents a basic area in the game.
 */
function Area() {
};

/**
 * This is called when the player enters an area.
 */
Area.prototype.enter = function() {
};

/**
 * This is called when the player leaves an area.
 */
Area.prototype.leave = function() {
};

Game.Area = Area;

// Set up the areas namespace.
Game.Areas = {};

})();