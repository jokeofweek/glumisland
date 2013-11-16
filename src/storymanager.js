(function() {
"use strict";

/**
 * Creates a new story manager based on a story element.
 * @param {$element} storyElement The story element to write to.
 */
function StoryManager(storyElement) {
  this._storyElement = storyElement;
};

StoryManager.prototype.record = function(message) {
  $('<div>').text(message).prependTo(this._storyElement);
};

Game.StoryManager = StoryManager;

})();