import fp from 'lodash/fp';
import {object, func} from 'prop-types';

import {konttiTypes} from '../utils.js';

const subscriberContextTypes = {
    Subscriber: object.isRequired
}

const createStoreContextTypes = (konttiType) => {
    const storeName = fp.upperFirst(konttiType);

    return {
        [storeName]: func.isRequired,
        [storeName + 'Store']: object.isRequired,
        _store: object.isRequired
    }
}

export default (konttiType, isSubscriber) => {
    const isDistributor = [konttiTypes.state, konttiTypes.model].includes(konttiType);

    const childContextTypes = isSubscriber ? subscriberContextTypes : {};

    if (isDistributor) return {
        containerChildContextTypes: Object.assign({}, 
            createStoreContextTypes(konttiType),
            childContextTypes
        )
    } 

    else return {
        containerContextTypes: createStoreContextTypes(konttiTypes.model),
        containerChildContextTypes: childContextTypes,
    }
}