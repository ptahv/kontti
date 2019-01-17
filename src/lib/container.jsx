import React from 'react';

import createProvider from './provider.jsx';
import createConsumer from './consumer.jsx';
import createPureConsumer from './pureConsumer.jsx';
import createUseKontti from './useKontti.js';

import withActions from './withActions.js';

import isEmpty from 'lodash/fp/isEmpty'

export default (...providerParams) => {
    const Container = React.createContext();

    const provider = createProvider(Container); 

    return Object.assign({}, {
        withActions,
        Consumer: createConsumer(Container),
        PureConsumer: createPureConsumer(Container),
        useKontti: createUseKontti(Container),
        
    }, isEmpty(providerParams) 
        ? { provider }
        : { Provider: provider(...providerParams) } 
    );
}