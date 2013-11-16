// These shim functions were pulled from rot.js (ROguelike Toolkit in JavaScript)
if (!Object.create) {  
  /**
   * ES5 Object.create
   */
  Object.create = function(o) {  
    var tmp = function() {};
    tmp.prototype = o;
    return new tmp();
  };  
}  
/**
 * Sets prototype of this function to an instance of parent function
 * @param {function} parent
 */
Function.prototype.extend = function(parent) {
  this.prototype = Object.create(parent.prototype);
  this.prototype.constructor = this;
  return this;
}

/**
 * Format a string in a flexible way. Scans for %s strings and replaces them with arguments. List of patterns is modifiable via String.format.map.
 * @param {string} template
 * @param {any} [argv]
 */
String.format = function(template) {
  var map = String.format.map;
  var args = Array.prototype.slice.call(arguments, 1);

  var replacer = function(match, group1, group2, index) {
    if (template.charAt(index-1) == "%") { return match.substring(1); }
    if (!args.length) { return match; }
    var obj = args[0];

    var group = group1 || group2;
    var parts = group.split(",");
    var name = parts.shift();
    var method = map[name.toLowerCase()];
    if (!method) { return match; }

    var obj = args.shift();
    var replaced = obj[method].apply(obj, parts);

    var first = name.charAt(0);
    if (first != first.toLowerCase()) { replaced = replaced.capitalize(); }

    return replaced;
  }
  return template.replace(/%(?:([a-z]+)|(?:{([^}]+)}))/gi, replacer);
}

String.format.map = {
  "s": "toString",
  "d": "describe"
}