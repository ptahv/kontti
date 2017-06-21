'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fp = require('lodash/fp');

var _fp2 = babelHelpers.interopRequireDefault(_fp);

var _store = require('../store.js');

var _store2 = babelHelpers.interopRequireDefault(_store);

var _container = require('../container.js');

var _container2 = babelHelpers.interopRequireDefault(_container);

var _getSubscriberProps = require('./getSubscriberProps.js');

var _getSubscriberProps2 = babelHelpers.interopRequireDefault(_getSubscriberProps);

var _utils = require('../utils.js');

function initCreateDistributor(distributorType, values, actions) {
	var createStore = (0, _store2.default)(values, actions);

	var _subscribedKeys = distributorType === _utils.konttiTypes.state ? Object.keys(values) : null;

	return function (_ref) {
		var subscribedKeys = _ref.subscribedKeys,
		    propTypes = _ref.propTypes,
		    ViewComponent = _ref.ViewComponent,
		    options = _ref.options;
		return (0, _container2.default)({
			options: options,
			propTypes: propTypes,
			createStore: createStore,
			ViewComponent: ViewComponent,

			konttiType: distributorType,
			subscribedKeys: _subscribedKeys || subscribedKeys
		});
	};
}

exports.default = function (distributorType) {
	return function (values, actions) {
		var createDistributor = initCreateDistributor(distributorType, values, actions);
		return _fp2.default.compose(createDistributor, _getSubscriberProps2.default);
	};
};