/**
 * @license
 * Copyright 2015-present, Petri Tahvanainen.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. 
 *
 */

import fp from 'lodash/fp';

export default (component, subscribedKeys) => {
    return component._store.subscribe(({updatedKeys}) => {
        if (component._isUnmounted)
            return;

        if (fp.intersection(updatedKeys, subscribedKeys).length === 0)
            return;

        component._storeChanging = true;
        component._storeChanged = true;

        component.setState({})
    })
}