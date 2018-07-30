/**
 * Copyright (c) 2015-present, Petri Tahvanainen.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import withChildren from '../utils/withChildren.js';
import keysSubscriptionFactory from '../utils/keysSubscriptionFactory.js';

export default class Kontti extends React.Component {
    constructor({store, listenedKeys}) {
        super();

        const keysSubscription = keysSubscriptionFactory({
            listenedKeys,
            keysListener: store.keysListener,
            triggerUpdate: () => this.setState({})
        })

        Object.assign(this, {
            componentWillUnmount: keysSubscription,

            // Can be simplified? () => withChildren()
            render: () => (
                <React.Fragment>
                    {withChildren(this.props.children, 
                        listenedKeys.length ? store.get(listenedKeys) : {},
                        store.actions
                    )}
                </React.Fragment>
            ) 
        })

    }
}