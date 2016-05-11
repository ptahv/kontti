/**
 * Copyright 2015-present, Petri Tahvanainen.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. 
 *
 */

import createConnector from './wrappers/createConnector.js';
import createListener from './wrappers/createListener.js';

const listenTo = (...keys) => (
    (ViewComponent, options) => (
        keys.length === 0
        	? createConnector(ViewComponent, options)
        	: createListener(ViewComponent, keys, options)
    )
)

export default listenTo;