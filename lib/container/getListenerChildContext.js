"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (component) {
    return {
        Subscriber: {
            // subscribedKeys,
            getPropsChanged: function getPropsChanged() {
                return component._propsChanged;
            },
            getStoreChanged: function getStoreChanged() {
                return component._storeChanged;
            }
        }
    };
};