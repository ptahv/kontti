/**
 * Copyright (c) 2015-present, Petri Tahvanainen.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {createContext} from 'react';

import createContainer from './lib/container.jsx';
import createConsumer from './lib/consumer.jsx';
import createProvider from './lib/provider.jsx';

export const container = createContainer;

const GlobalContainer = createContext();
export const Consumer = createConsumer(GlobalContainer);
export const provider = createProvider(GlobalContainer);

export default {
    provider,
    Consumer,

    // Can be used to create a private state
    //
    container
}
