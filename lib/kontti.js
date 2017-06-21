'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createDistributor = require('./kontti/createDistributor.js');

var _createDistributor2 = babelHelpers.interopRequireDefault(_createDistributor);

var _createSubscriber = require('./kontti/createSubscriber.js');

var _createSubscriber2 = babelHelpers.interopRequireDefault(_createSubscriber);

var _utils = require('./utils.js');

function createContainer(konttiType, isPure) {
	if ([_utils.konttiTypes.model, _utils.konttiTypes.state].includes(konttiType)) return (0, _createDistributor2.default)(konttiType);

	return (0, _createSubscriber2.default)(konttiType, isPure);
}

exports.default = {
	model: createContainer(_utils.konttiTypes.model),
	state: createContainer(_utils.konttiTypes.state),

	connector: createContainer(_utils.konttiTypes.connector),
	pureConnector: createContainer(_utils.konttiTypes.connector, true)
};