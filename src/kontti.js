import createDistributor from './lib/createDistributor.js';
import createSubscriber from './lib/createSubscriber.js';

import {konttiTypes} from './utils.js';

export default {
	model: createDistributor(konttiTypes.model),
	state: createDistributor(konttiTypes.state),

	connector: createSubscriber(konttiTypes.connector),
	pureConnector: createSubscriber(konttiTypes.connector, true)
}