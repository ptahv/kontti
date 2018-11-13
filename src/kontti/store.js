import pick from 'lodash/fp/pick';
import isEmpty from 'lodash/fp/isEmpty';
import {stream} from 'striimi';

import cloneDeep from '../lib/cloneDeep.js';

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

		const allowedValues = pick(storeKeys, values);

        if (!isEmpty(allowedValues)) {
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
        if (isEmpty(keys))
            return store;

        if (typeof keys[0] === 'function')
            return keys[0](store);

        return pick(
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
