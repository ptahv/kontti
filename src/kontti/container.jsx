import {createContext} from 'react';

import createProvider from './provider.jsx';
import createConsumer from './consumer.jsx';
import createPureConsumer from './pureConsumer.jsx';

export default (...providerConfig) => {
    const Container = createContext();

    const Provider = createProvider(Container)(...providerConfig);
    const Consumer = createConsumer(Container);
    const PureConsumer = createPureConsumer(Consumer);
    
    return {
        Provider,
        Consumer,
        PureConsumer
    }
};