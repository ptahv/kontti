'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fp = require('lodash/fp');

var _fp2 = babelHelpers.interopRequireDefault(_fp);

function getSubscribedKeys(args) {
	if (_fp2.default.isString(args[0])) {
		var keys = args.slice(0, args.findIndex(_fp2.default.isFunction));

		return keys;
	} else if (_fp2.default.isPlainObject(args[0])) {
		var propTypes = args[0];
		return Object.keys(propTypes);
	}

	return [];
}

function getPropTypes(args) {
	if (_fp2.default.isPlainObject(args[0])) return args[0];

	return {};
}

function getComponent(args) {
	return args.find(_fp2.default.isFunction);
}

function getOptions(args) {
	var componentIndex = args.findIndex(_fp2.default.isFunction);
	if (args.length === componentIndex + 2) return args[componentIndex + 1];

	return {};
}

exports.default = function () {
	for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		args[_key] = arguments[_key];
	}

	return {
		subscribedKeys: getSubscribedKeys(args),
		propTypes: getPropTypes(args),
		ViewComponent: getComponent(args),
		options: getOptions(args)
	};
};