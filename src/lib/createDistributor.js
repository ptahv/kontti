import fp from 'lodash/fp';

import store from '../store.js';
import container from '../container.js';
import getSubscriberProps from './getSubscriberProps.js';
import {konttiTypes} from '../utils.js';

function initCreateDistributor(distributorType, values, actions) {
	const createStore = store(values, actions);

	const _subscribedKeys = distributorType === konttiTypes.state
		? Object.keys(values)
		: null;

	return ({subscribedKeys, propTypes, ViewComponent, options}) => container({
		options,
		propTypes,
		createStore,
		ViewComponent,

		konttiType: distributorType,
		subscribedKeys: _subscribedKeys || subscribedKeys,
	})
}

export default (distributorType) => {
	return (values, actions) => {
		const createDistributor = initCreateDistributor(distributorType, values, actions);
		return fp.compose(createDistributor, getSubscriberProps)
	}
}