import pick from 'lodash/fp/pick';
import isEmpty from 'lodash/fp/isEmpty';
import cloneDeep from 'lodash/fp/cloneDeep';

export default (initValues) => {
    let store = cloneDeep(initValues);
    const storeKeys = Object.keys(initValues);
    
    return {
        get(...keys) {    
            if (isEmpty(keys))
                return store;

            if (typeof keys[0] === 'function')
                return keys[0](store)

            return pick(
                Array.isArray(keys[0]) ? keys[0] : keys, 
                store
            )
        },

        update(values = {}, onAfterUpdate) {
            const allowedValues = pick(storeKeys,
                typeof values === 'function'
                    ? values(store)
                    : values    
            )

            if (!isEmpty(allowedValues)) {
                store = Object.assign({}, store, allowedValues)

                onAfterUpdate({updatedKeys: Object.keys(allowedValues)})
            }
        } 
    }
}
