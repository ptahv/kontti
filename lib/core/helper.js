/**
 * Copyright 2015-present, Petri Tahvanainen.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. 
 *
 */

import {PropTypes} from 'react';

import {
    reduce,
    isEmpty,
    isEqual } from 'lodash'; 

const isObject = (value) => !Array.isArray(value) && typeof value === 'object';
const isFunction = (value) => typeof value === 'function';

const cloneDeep = (obj) => {
    if (obj == null || typeof obj != "object") return obj;

    if (obj.constructor != Object && obj.constructor != Array) return obj;
    
    if (obj.constructor == Date || obj.constructor == RegExp || obj.constructor == Function ||
        obj.constructor == String || obj.constructor == Number || obj.constructor == Boolean)
        return new from.constructor(obj);

    var deepClonedObj = new obj.constructor();
    for (var name in obj)
    {
        deepClonedObj[name] = typeof deepClonedObj[name] == "undefined" 
            ? cloneDeep(obj[name]) 
            : deepClonedObj[name];
    }

    return deepClonedObj; 
}

const shallowEquals = (obj1, obj2) => {
    for (var key in obj1) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }

    return true;
}

const createViewContextTypes = ({contextTypes}) => {
    const viewContextTypes = {
        Model: PropTypes.object.isRequired
    }

    if (isEmpty(contextTypes)) {
        return viewContextTypes;
    }

    return Object.assign(contextTypes, viewContextTypes)
}


export {
    isObject,
    isFunction,

    cloneDeep,
    shallowEquals,

    createViewContextTypes
}
