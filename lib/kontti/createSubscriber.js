'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fp = require('lodash/fp');

var _fp2 = babelHelpers.interopRequireDefault(_fp);

var _container = require('../container.js');

var _container2 = babelHelpers.interopRequireDefault(_container);

var _getSubscriberProps = require('./getSubscriberProps.js');

var _getSubscriberProps2 = babelHelpers.interopRequireDefault(_getSubscriberProps);

function initCreateSubscriberComponent(subscriberType, isPure) {
	return function (_ref) {
		var subscribedKeys = _ref.subscribedKeys,
		    propTypes = _ref.propTypes,
		    options = _ref.options,
		    ViewComponent = _ref.ViewComponent;
		return (0, _container2.default)({
			isPure: isPure,
			options: options,
			propTypes: propTypes,
			ViewComponent: ViewComponent,
			subscribedKeys: subscribedKeys,

			konttiType: subscriberType
		});
	};
}

exports.default = function (subscriberType, isPure) {
	var createSubscriber = initCreateSubscriberComponent(subscriberType, isPure);
	return _fp2.default.compose(createSubscriber, _getSubscriberProps2.default);
};