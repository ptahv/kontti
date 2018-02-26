import React from 'react';
import fp from 'lodash/fp';

import createStoreSubscription from './lib/createStoreSubscription.js';
import getListenerChildContext from './lib/getListenerChildContext.js';
import getDistributorChildContext from './lib/getDistributorChildContext.js';
import getContainerContext from './lib/getContainerContext.js';

import equals from 'is-equal-shallow'

export default ({
    konttiType, 

    // Subscriber props
    isPure,

    // Distributor props
    createStore,

    options = {},
    propTypes = {},
    subscribedKeys = [], 

    ViewComponent,
}) => {
    const {
        propTypes: componentPropTypes,
        contextTypes: componentContextTypes
    } = options;

    const isSubscriber = !fp.isEmpty(subscribedKeys);
    const isDistributor = !fp.isNil(createStore);

    class ContainerComponent extends React.Component {
        /* Statics: 
            _storeChanging,
            _storeChanged,
            _propsChanged,
        */

        componentWillMount() {
            if (isDistributor)
                this._store = createStore();
            else 
                this._store = this.context._store;

            if (isSubscriber)
                this._storeSubscription = createStoreSubscription(this, subscribedKeys)

            ViewComponent.propTypes = Object.assign({}, 
                ContainerComponent.propTypes,
                ViewComponent.propTypes,
                componentPropTypes,
                propTypes,
            )
            ContainerComponent.propTypes = {};

            /* ContextTypes */
            ViewComponent.contextTypes = fp.omit('_store', Object.assign({}, 
                ViewComponent.contextTypes,
                componentContextTypes,
                ContainerComponent.contextTypes,
                ContainerComponent.childContextTypes
            ))
        }

        getChildContext() {
            return Object.assign({},
                isSubscriber && getListenerChildContext(this),
                isDistributor && getDistributorChildContext(this, konttiType)
            )
        }

        componentWillReceiveProps() {
            if (isSubscriber)
                this._propsChanged = true;
        }

        shouldComponentUpdate(nextProps) {
            this._storeChanging = false;

            const {
                props,

                _storeState, 
                _storeChanged
            } = this;

            const nextStoreState = this._store.get(...subscribedKeys);

            const stateEquals = equals(_storeState, nextStoreState)
            if (isPure && (!_storeChanged || stateEquals))
                return false;

            else if (equals(props, nextProps) && stateEquals)
                return false;   

            this._storeState = nextStoreState;
            return true;
        }

        componentDidUpdate() {
			if (!this._storeChanging)
                this._storeChanged = false;
            
            this._propsChanged = false;
		}

        componentWillUnmount() {
            this._isUnmounted = true;

            if (isSubscriber)
                this._storeSubscription();
        }

        render() {
            const {children, ...restOfProps} = this.props;

            const props = !isSubscriber ? restOfProps : Object.assign({}, 
                restOfProps,
                this._store.get(...subscribedKeys)
            );

            return (
                <ViewComponent
                    {...props} 
                    >
                    {children}
                </ViewComponent>
            )
        }
    }

    /* Setup Container contextTypes */
    const {
        containerContextTypes = {},
        containerChildContextTypes = {}
    } = getContainerContext(konttiType, isSubscriber);

    ContainerComponent.contextTypes = containerContextTypes;
    ContainerComponent.childContextTypes = containerChildContextTypes;

    return ContainerComponent;
}