/**
 * Copyright (c) 2015-present, Petri Tahvanainen.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import fp from 'lodash/fp';
import {stream} from 'striimi';

import cloneDeep from '../utils/cloneDeep';

export default (values,	actionsFn) => {
    let store 	            = cloneDeep(values);
    const storeKeys 	    = Object.keys(values);
    const changedKeysStream = stream(storeKeys);

    // Could show an error if inserting keys that doesnt exist in store
    //
    const _insert = (newValues) => {
        const values = typeof newValues === 'function'
            ? newValues(store)
            : newValues;

		const allowedValues = fp.pick(storeKeys, values);

        if (!fp.isEmpty(allowedValues)) {
            store = Object.assign({}, 
                store,
                allowedValues
            )

            return Object.keys(allowedValues);
        }
    }
    
    // Could show an error if looking for keys that doesnt exist in store
    //
    const get = Object.assign((...keys) => {
        if (fp.isEmpty(keys))
            return store;

        if (typeof keys[0] === 'function')
            return keys[0](store);

        return fp.pick(
            Array.isArray(keys[0]) ? keys[0] : keys,
            store
        );
        
    }, {prototype: {name: 'get'}});

    let actions = actionsFn({
        get,

        set: Object.assign((newValues) => {
            const insertedValueKeys = _insert(newValues);
            
            if (insertedValueKeys)
            changedKeysStream.emit(insertedValueKeys)
            
            return actions;
        }, {prototype: {name: 'set'}}),

        put: Object.assign((newValues) => {
            _insert(newValues);
            
            return actions;
        }, {prototype: {name: 'put'}})
    });

    return {
        get,
        actions,
        keysListener: changedKeysStream.listen,
    }
}
