(function() {
"use strict";

function RuleManager() {
  this._rules = [];
};

RuleManager.prototype.update = function() {
  // Iterate through each rule, checking the condition and executing
  // all results if the condition was satisfied. Remove a rule from the
  // list of rules once it's been satisfied.
  for (var i = 0; i < this._rules.length; i++) {
    if (this._rules[i].condition()) {
      // Execute all results
      for (var j = 0, l = this._rules[i].results.length; j < l; j++) {
        this._rules[i].results[j]();
      }
      // Remove the rule
      this._rules.splice(i, 1);
      i--;
    }
  }
};

RuleManager.prototype.add = function(condition) {
  // Extract the results from the remaining arguments.
  var results = Array.prototype.slice.call(arguments, 1);
  this._rules.push({
    condition: condition,
    results: results
  })
};

Game.RuleManager = RuleManager;
})();