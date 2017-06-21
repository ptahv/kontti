'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fp = require('lodash/fp');

var _fp2 = babelHelpers.interopRequireDefault(_fp);

// Objects shallow equals
exports.default = function (obj1, obj2) {
    if (!_fp2.default.isPlainObject(obj1) || !_fp2.default.isPlainObject(obj2)) return false;

    var obj1keys = Object.keys(obj1);
    var obj2keys = Object.keys(obj2);

    var obj1keysLength = obj1keys.length;

    if (obj1keysLength !== obj2keys.length) return false;

    for (var i = 0; i < obj1keysLength; i++) {
        var key = obj1keys[i];

        if (obj1[key] !== obj2[key]) return false;
    }

    return true;
};