'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fp = require('lodash/fp');

var _fp2 = babelHelpers.interopRequireDefault(_fp);

exports.default = function (component, subscribedKeys) {
    return component._store.subscribe(function (_ref) {
        var updatedKeys = _ref.updatedKeys;

        if (component._isUnmounted) return;

        if (_fp2.default.intersection(updatedKeys, subscribedKeys).length === 0) return;

        component._storeChanging = true;
        component._storeChanged = true;

        component.setState({});
    });
}; /**
    * @license
    * Copyright 2015-present, Petri Tahvanainen.
    * All rights reserved.
    *
    * This source code is licensed under the BSD-style license found in the
    * LICENSE file in the root directory of this source tree. 
    *
    */