'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactDom = require('react-dom');

var _reactDom2 = babelHelpers.interopRequireDefault(_reactDom);

var _fp = require('lodash/fp');

var _fp2 = babelHelpers.interopRequireDefault(_fp);

exports.default = function (component, konttiType) {
    var _ref;

    var typeName = _fp2.default.upperFirst(konttiType);
    var storeName = typeName + 'Store';

    var _component$_store = component._store,
        get = _component$_store.get,
        actions = _component$_store.actions,
        subscribe = _component$_store.subscribe,
        defaultActions = _component$_store.defaultActions;


    return _ref = {}, babelHelpers.defineProperty(_ref, typeName, babelHelpers.extends(function (fn) {
        return _reactDom2.default.unstable_batchedUpdates(function () {
            return fn(defaultActions);
        });
    }, defaultActions)), babelHelpers.defineProperty(_ref, storeName, actions), babelHelpers.defineProperty(_ref, '_store', {
        get: get,
        subscribe: subscribe
    }), _ref;
};