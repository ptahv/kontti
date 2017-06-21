'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fp = require('lodash/fp');

var _fp2 = babelHelpers.interopRequireDefault(_fp);

var _propTypes = require('prop-types');

var _utils = require('../utils.js');

var subscriberContextTypes = {
    Subscriber: _propTypes.object.isRequired
};

var createStoreContextTypes = function createStoreContextTypes(konttiType) {
    var _ref;

    var storeName = _fp2.default.upperFirst(konttiType);

    return _ref = {}, babelHelpers.defineProperty(_ref, storeName, _propTypes.func.isRequired), babelHelpers.defineProperty(_ref, storeName + 'Store', _propTypes.object.isRequired), babelHelpers.defineProperty(_ref, '_store', _propTypes.object.isRequired), _ref;
};

exports.default = function (konttiType, isSubscriber) {
    var isDistributor = [_utils.konttiTypes.state, _utils.konttiTypes.model].includes(konttiType);

    var childContextTypes = isSubscriber ? subscriberContextTypes : {};

    if (isDistributor) return {
        containerChildContextTypes: babelHelpers.extends({}, createStoreContextTypes(konttiType), childContextTypes)
    };else return {
        containerContextTypes: createStoreContextTypes(_utils.konttiTypes.model),
        containerChildContextTypes: childContextTypes
    };
};