/**
 * Copyright (c) 2015-present, Petri Tahvanainen.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import fp from 'lodash/fp';

export default ({keysListener, listenedKeys, triggerUpdate}) => {
    let unmounted = null;

    let _storeSubscription = listenedKeys && keysListener((updatedKeys) => {
        if (unmounted)
            return;
        
        if (!fp.intersection(updatedKeys, listenedKeys).length)
            return;
            
        triggerUpdate();
    });

    return () => {
        unmounted = true;

        if (_storeSubscription)
            _storeSubscription();
    }
}