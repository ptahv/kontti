/**
 * Copyright (c) 2015-present, Petri Tahvanainen.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Kontti from './kontti';

export default (Container) => ({children, ...listenedKeysObj}) => (
    <Container.Consumer>
        {(store) => (
            <Kontti 
                store={store}
                listenedKeys={Object.keys(listenedKeysObj)}
                >
                {children}
            </Kontti>
        )}
    </Container.Consumer>
)