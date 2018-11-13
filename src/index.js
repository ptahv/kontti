/**
 * Copyright (c) 2015-present, Petri Tahvanainen.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {createContext} from 'react';

import createContainer from './kontti/container.jsx';

import createProvider from './kontti/provider.jsx';
import createConsumer from './kontti/consumer.jsx';
import createPureConsumer from './kontti/pureConsumer.jsx';

import withActionsUtil from './utils/withActions.js';

export const container = createContainer;

const GlobalContainer = createContext();
export const provider = createProvider(GlobalContainer);
export const Consumer = createConsumer(GlobalContainer);
export const PureConsumer = createPureConsumer(Consumer);

export const withActions = withActionsUtil;

export default {
    container,

    provider,
    Consumer,
    PureConsumer,

    withActions
}
