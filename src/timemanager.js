(function() {
"use strict";

var DAWN_TIME = 6;
var DAY_TIME = 8;
var DUSK_TIME = 18;
var EVENING_TIME = 20;
var MILLIS_PER_HOUR = Game.Config.MINUTE_DELAY * 60;

function TimeManager(backgroundElement) {
  Game.Observable.call(this);
  this._days = 0;
  this._hours = 0;
  this._minutes = 0;
  this._timer = null;
  this._scheduledEvents = {};
  this._backgroundElement = backgroundElement;
};
TimeManager.extend(Game.Observable);

/**
 * Starts the time manager at a given time point, and starts the tick timer.
 * @param  {int} days    The number of days to start at.
 * @param  {int} hours   The number of hours to start at.
 * @param  {int} minutes The number of minutes to start at.
 */
TimeManager.prototype.start = function(days, hours, minutes) {
  this._days = days;
  this._hours = hours;
  this._minutes = minutes;
  Game.log('Started time manager at ' + days + ' day(s) ' + hours + ':' + minutes);
  this._timer = setInterval(this.tick.bind(this), Game.Config.MINUTE_DELAY);
};

/**
 * This function is called every clock tick, and takes care of updating the clock.
 */
TimeManager.prototype.tick = function() {
  var hourChange = false;
  var dayChange = false;

  // Update clock
  this._minutes++;
  if (this._minutes == 60) {
    this._hours++;
    this._minutes = 0;
    hourChange = true;
    if (this._hours == 24) {
      this._hours = 0;
      this._days++;
      dayChange = true;
    }
  }

  // Raise the time event
  this.raise('time-' + this.toTimeStamp(this._days, this._hours, this._minutes));

  // Raise events on day and hour change
  if (hourChange) {
    this._updateHour();
    this.raise('hourChange');
  }
  if (dayChange) {
    this.raise('dayChange');
  }
};

TimeManager.prototype._updateHour = function() {
  Game.log('_updateHour - ' + this._hours);

  if (this._hours == DAWN_TIME) {
    Game.getStoryManager().record('You see the sun start to come up in the distance.');
    this._backgroundElement.animate({backgroundColor: Game.Config.DAY_COLOR}, 
      MILLIS_PER_HOUR * (DAY_TIME - DAWN_TIME));
  } else if (this._hours == DUSK_TIME) {
    Game.getStoryManager().record('The sky starts to darken as the sun begins setting.');
    this._backgroundElement.animate({backgroundColor: Game.Config.NIGHT_COLOR}, 
      MILLIS_PER_HOUR * (EVENING_TIME - DUSK_TIME));
  }
};


TimeManager.prototype.getDays = function() {
  return this._days;
};

TimeManager.prototype.getHours = function() {
  return this._hours;
};

TimeManager.prototype.getMinutes= function() {
  return this._minutes;
};

/**
 * @return {string} a string describing the current time of day.
 */
TimeManager.prototype.describe = function() {
  // Describe the time of day.
  if (this._hours < DAWN_TIME) {
    return 'evening';
  } else if (this._hours < DAY_TIME) {
    return 'dawn';
  } else if (this._hours < DUSK_TIME) {
    return 'day';
  } else if (this._hours < EVENING_TIME) {
    return 'dusk';
  } else {
    return 'evening';
  }
};

/**
 * Generated a timestamp for a given timepoint in the game.
 * @param  {int} days    The number of days.
 * @param  {int} hours   The number of hours.
 * @param  {int} minutes The number of minutes.
 * @return {int}         A timestamp for that time point.
 */
TimeManager.prototype.toTimeStamp = function(days, hours, minutes) {
  return (days * 3600) + (hours * 60) + minutes;
};

/**
 * Schedules an event to take place at a given time point.
 * @param  {int}   days    the number of days.
 * @param  {int}   hours   the number of hours.
 * @param  {int}   minutes the number of minutes.
 * @param  {Function} fn   The event which should be executed.
 */
TimeManager.prototype.schedule = function(days, hours, minutes, fn) {
  this.listenOnce('time-' + this.toTimeStamp(days, hours, minutes), fn);
};

/**
 * Schedules an event to take place at a given time point relative to
 * the current time.
 * @param  {int}   days    How many days in the future.
 * @param  {int}   hours   How many hours in the future.
 * @param  {int}   minutes How many minutes in the future.
 * @param  {Function} fn      The event to be executed.
 */
TimeManager.prototype.scheduleRelative = function(days, hours, minutes, fn) {
  this.listenOnce('time-' + this.toTimeStamp(this._days + days, this._hours + hours,
      this._minutes + minutes), fn);
};

/**
 * Schedule an event to take place repeatedly at a given interval.
 * @param  {int}   daysInterval    How many days in between.
 * @param  {int}   hoursInterval   How many hours in betwen.
 * @param  {int}   minutesInterval How many minutes in the future.  
 * @param  {Function} fn              The event to be executed every interval.
 */
TimeManager.prototype.scheduleInterval = function(daysInterval, hoursInterval, minutesInterval, fn) {
  var self = this;
  var intervalFn = function() {
    fn();
    self.scheduleRelative(daysInterval, hoursInterval, minutesInterval, intervalFn);
  };
  self.scheduleRelative(daysInterval, hoursInterval, minutesInterval, intervalFn);
};

Game.TimeManager = TimeManager;

})();