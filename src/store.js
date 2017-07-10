import fp from 'lodash/fp';
import {stream} from 'striimi';

import {cloneDeep} from './utils.js';
import initCreateDefaultActions from './store/initCreateDefaultActions.js'

export default (
	values = {}, 
	actions = () => ({}),
) => {
	const storeKeys = Object.keys(values);
	const pickAllowedValues = fp.pick(storeKeys);
	const createDefaultActions = initCreateDefaultActions(storeKeys);

	/* InitFunction */
	return () => {
		const _storeStrm = stream(cloneDeep(values))

		const _insert = (newValues) => {
			const allowedValues = pickAllowedValues(newValues);

			if (fp.isEmpty(allowedValues))
				return null;

			_storeStrm.setValues(Object.assign({}, 
				_storeStrm.getValues(),
				allowedValues
			))

			return allowedValues;
		}

		/* Create Store */
		const store = {
			subscribe: _storeStrm.subscribe,
			
			get: (...keys) => {
				if (fp.isEmpty(keys))
					return _storeStrm.getValues();

				return fp.pick(keys, _storeStrm.getValues());
			},

			put: (newValues) => {
				_insert(newValues);

				return store;
			},

			set: (newValues) => {
				const insertedValues = _insert(newValues);
				
				if (!insertedValues)
					return;
				
				_storeStrm.emit({
					updatedKeys: Object.keys(insertedValues)
				})

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
