import fp from 'lodash/fp';

import container from '../container.js'
import getSubscriberProps from './getSubscriberProps.js';

function initCreateSubscriberComponent(subscriberType, isPure) {
	return ({subscribedKeys, propTypes, options, ViewComponent}) => container({
		isPure,
		options,
		propTypes,
		ViewComponent,
		subscribedKeys,

		konttiType: subscriberType,
	});
}

export default (subscriberType, isPure) => {
	const createSubscriber = initCreateSubscriberComponent(subscriberType, isPure);
	return fp.compose(createSubscriber, getSubscriberProps)
}