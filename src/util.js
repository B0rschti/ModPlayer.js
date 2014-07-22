(function (mp) {
  'use strict';

  var util = mp.util = {};

  util.constant = function (value) {
    return function () { return value; };
  };

  // Copies all of the properties in the source object over to
  // the destination object, and returns the destination object.
  util.extend = function (dest, src) {
    for (var x in src) {
      dest[x] = src[x];
    }

    return dest;
  };

  // Flattens a nested array (first nesting level).
  util.flatten = function (array) {
    return [].concat.apply([], array);
  };

  util.pick = function (obj, keys) {
    if (! Array.isArray(keys)) {
      keys = Array.from(arguments).slice(1);
    }

    return keys.reduce(function (res, key) {
      return (res[key] = obj[key], res);
    }, {});
  };

  // Creates a list of integers from 0 to stop, exclusive.
  util.range = function (stop) {
    return Array.apply(null, new Array(stop)).map(function (x, i) { return i; });
  };

  util.startsWith = function (str, substr) {
    return (str.indexOf(substr) === 0);
  };

  /**
   * GETs the given URL.
   *
   * @param {String} url The URL to get
   * @param {String} [type='json'] The expected `responseType`
   * @param {Function} done The callback with `err` and `res` arguments
   */
  util.get = function (url, type, done) {
    if (! done) {
      done =  type;
      type = 'json';
    }

    var isText = (type === 'text' || ! type),
        isJSON = (type === 'json');

    var xhr = util.extend(new XMLHttpRequest(), {

      responseType: isJSON ? '' : type, // Chrome doesn't support responseType='json'

      onload: function () {
        done(null, isText ? xhr.responseText : (isJSON ? eval('(' + xhr.responseText + ')') : xhr.response));
      },

      onerror: function () {
        done(xhr);
      }

    });

    xhr.open('GET', url);
    xhr.send();
  };

})(window.ModPlayer);