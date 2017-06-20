import createDistributor from './kontti/createDistributor.js';
import createSubscriber from './kontti/createSubscriber.js';

import {konttiTypes} from './utils.js';

function createContainer(konttiType, isPure) {
	if ([konttiTypes.model, konttiTypes.state].includes(konttiType)) 
		return createDistributor(konttiType);

	return createSubscriber(konttiType, isPure);
}

export default {
	model: createContainer(konttiTypes.model),
	state: createContainer(konttiTypes.state),

	connector: createContainer(konttiTypes.connector),
	pureConnector: createContainer(konttiTypes.connector, true)
}