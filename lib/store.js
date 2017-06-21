'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fp = require('lodash/fp');

var _fp2 = babelHelpers.interopRequireDefault(_fp);

var _striimi = require('striimi');

var _utils = require('./utils.js');

var _initCreateDefaultActions = require('./store/initCreateDefaultActions.js');

var _initCreateDefaultActions2 = babelHelpers.interopRequireDefault(_initCreateDefaultActions);

exports.default = function (values, actions) {
	var storeKeys = Object.keys(values);
	var pickAllowedValues = _fp2.default.pick(storeKeys);
	var createDefaultActions = (0, _initCreateDefaultActions2.default)(storeKeys);

	// Init Function
	return function () {
		var _values = (0, _utils.cloneDeep)(values);
		var _stream = (0, _striimi.stream)(_values);

		var _insert = function _insert(newValues) {
			var allowedValues = pickAllowedValues(newValues);

			if (_fp2.default.isEmpty(allowedValues)) return false;

			_values = babelHelpers.extends({}, _values, allowedValues);

			return allowedValues;
		};

		/* Create Store */

		var store = {
			subscribe: _stream.subscribe,

			get: function get() {
				for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
					keys[_key] = arguments[_key];
				}

				if (_fp2.default.isEmpty(keys)) return _values;

				return _fp2.default.pick(keys, _values);
			},

			put: function put(newValues) {
				_insert(newValues);
			},

			set: function set(newValues) {
				var insertedValues = _insert(newValues);

				if (!insertedValues) return;

				_stream.emit({
					updatedKeys: Object.keys(insertedValues)
				});
			}
		};

		store.actions = actions({
			get: store.get,
			set: store.set,
			put: store.put
		});

		store.defaultActions = createDefaultActions({
			get: store.get,
			set: store.set
		});

		return store;
	};
};