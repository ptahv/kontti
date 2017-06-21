'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fp = require('lodash/fp');

var _fp2 = babelHelpers.interopRequireDefault(_fp);

exports.default = function (keys) {
	return function (_ref) {
		var get = _ref.get,
		    set = _ref.set;

		var defaultActions = keys.reduce(function (retVal, key) {
			retVal['set' + _fp2.default.upperFirst(key)] = function (value) {
				set(babelHelpers.defineProperty({}, key, value));

				return defaultActions;
			};

			// Can do cloneDeep if wanted, Model.getPatients(true);
			retVal['get' + _fp2.default.upperFirst(key)] = function () /*cloneDeep*/{
				return get(key)[key];
			};

			return retVal;
		}, {});

		return defaultActions;
	};
};