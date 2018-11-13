import React from 'react';

import withChildren from '../lib/withChildren.js';
import keysSubscriptionFactory from '../lib/keysSubscriptionFactory.js';

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