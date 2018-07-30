/**
 * Copyright (c) 2015-present, Petri Tahvanainen.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {createContext} from 'react';

import createProvider from './provider.jsx';
import createConsumer from './consumer.jsx';

export default (...providerConfig) => {
    const Container = createContext();
    
    return {
        Provider: createProvider(Container)(...providerConfig),
        Consumer: createConsumer(Container)
    }
};