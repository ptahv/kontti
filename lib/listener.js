/**
 * Copyright 2015-present, Petri Tahvanainen.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. 
 *
 */

import createConnector from './wrappers/createConnector';
import createListener from './wrappers/createListener';

let listenedKeys = [];

const listenTo = (...keys) => {
    if (listenedKeys.length !== 0) {
        console.warn('You have not connected listener with keys: ' + keys);
    }

    listenedKeys = keys;
}

const create = (ViewComponent, options) => {
    const listenerComponent = ( 
        listenedKeys.length === 0
            ? createConnector(ViewComponent, options)
            : createListener(ViewComponent, listenedKeys, options)
    )

    listenedKeys = [];
    return listenerComponent; 
}

export default Object.assign(create, { listenTo });
