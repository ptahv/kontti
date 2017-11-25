import fp from 'lodash/fp';
import {stream} from 'striimi';

import {cloneDeep} from './utils.js';
import initCreateDefaultActions from './lib/createDefaultActions.js'

export default (
	values = {}, 
	actions = () => ({}),
) => {
	const storeKeys = Object.keys(values);
	const pickAllowedValues = fp.pick(storeKeys);
	const createDefaultActions = initCreateDefaultActions(storeKeys);

	/* InitFunction */
	return () => {
		let _storeValues = cloneDeep(values);
		const _storeStrm = stream(null);

		const _insert = (newValues) => {
			const allowedValues = pickAllowedValues(newValues);

			if (fp.isEmpty(allowedValues))
				return null;

			_storeValues = Object.assign({}, 
				_storeValues,
				allowedValues
			)

			return allowedValues;
		}

		/* Create Store */
		const store = {
			subscribe: _storeStrm.subscribe,
			
			get: (...keys) => {
				if (fp.isEmpty(keys))
					return _storeValues;
				
				const _keys = Array.isArray(keys[0]) ? keys[0] : keys;

				return fp.pick(_keys, _storeValues);
			},

			put: (newValues) => {
				_insert(newValues);

				return store;
			},

			set: (newValues) => {
				const insertedValues = _insert(newValues);
				
				if (!insertedValues)
					return;
				
				_storeStrm.emit(Object.keys(insertedValues))

				return store;
			}
		}

		store.actions = actions({
			get: store.get,
			set: store.set,
			put: store.put
		})

		store.defaultActions = createDefaultActions({
			get: store.get,
			set: store.set
		})

		return store;
	}
}
