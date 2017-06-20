import fp from 'lodash/fp';

export default (keys) => {
    return ({get, set}) => {
		const defaultActions = keys.reduce((retVal, key) => {
			retVal['set' + fp.upperFirst(key)] = (value) => {
				set({ [key]: value });

				return defaultActions;
			};

			// Can do cloneDeep if wanted, Model.getPatients(true);
			retVal['get' + fp.upperFirst(key)] = (/*cloneDeep*/) => {
				return get(key)[key];
			};

			return retVal;			
		}, {});

		return defaultActions;
	}
}