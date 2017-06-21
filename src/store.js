import fp from 'lodash/fp';
import {stream} from 'striimi';

import {cloneDeep} from './utils.js';
import initCreateDefaultActions from './store/initCreateDefaultActions.js'

export default (
	values, 
	actions,
) => {
	const storeKeys = Object.keys(values);
	const pickAllowedValues = fp.pick(storeKeys);
	const createDefaultActions = initCreateDefaultActions(storeKeys);

	// Init Function
	return () => {
		let _values = cloneDeep(values);
		const _stream = stream(_values)

		const _insert = (newValues) => {
			const allowedValues = pickAllowedValues(newValues);

			if (fp.isEmpty(allowedValues))
				return false;
				
			_values = Object.assign({}, 
				_values,
				allowedValues
			)

			return allowedValues;
		}

		/* Create Store */

		const store = {
			subscribe: _stream.subscribe,
			
			get: (...keys) => {
				if (fp.isEmpty(keys))
					return _values;

				return fp.pick(keys, _values);
			},

			put: (newValues) => {
				_insert(newValues);
			},

			set: (newValues) => {
				const insertedValues = _insert(newValues);
				
				if (!insertedValues)
					return;
				
				_stream.emit({
					updatedKeys: Object.keys(insertedValues)
				})
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
