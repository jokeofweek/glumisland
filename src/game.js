(function(window) {
"use strict";

window.Game = {
  _storyElement: null,
  _levelElement: null,
  _ruleManager: null,
  _storyManager: null,
  _timeManager: null,
  _state: null,
  /**
   * Puts the game in the starting state.
   */
  start: function() {
    this.log('Game start.');

    // Set up the game elements.
    this._storyElement = $('<div>').
        attr('id', 'story-container').
        appendTo('body');
    this._levelElement = $('<div>').
        attr('id', 'level-container').
        appendTo('body');

    // Set up the managers
    this._storyManager = new Game.StoryManager(this._storyElement);
    this._ruleManager = new Game.RuleManager();
    this._timeManager = new Game.TimeManager($('#story-container'));

    // Start the time manager timer!
    this._timeManager.start(0, 8, 0);

    // Set up the game state
    this._state = new Game.State();
    this._state.switchArea(Game.Areas.Camp);
  },
  /**
   * Logs a message for debugging purposes. These should not be shown
   * to the player.
   * @param  {?} message The value to log.
   */
  log: function(message) {
    console.log(message);
  },
  /**
   * @return {Game.StoryManager} The story manager for the current game.
   */
  getStoryManager: function() {
    return this._storyManager;
  },
  /**
   * @return {Game.TimeManager} The time manager for the current game.
   */
  getTimeManager: function() {
    return this._timeManager;
  },
  /**
   * Namespace for UI classes and functions
   * @type {Object}
   */
  UI: {}
}


})(window);