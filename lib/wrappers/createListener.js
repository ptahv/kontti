/**
 * Copyright 2015-present, Petri Tahvanainen.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. 
 *
 */

import React, {Component} from 'react';

import {
    pick,
    isEmpty, 
    isEqual } from 'lodash';

import {
    cloneDeep,
 	shallowEquals,
    createViewContextTypes } from '../core/helper.js';

const {func} = React.PropTypes;
const listenerContextTypes = {
    ___Kontti__GetModel_: func.isRequired,
    ___Kontti__Subscribe_: func.isRequired
};

const createListener = (ViewComponent, keys, {ref}={}) => {
    class ListenerComponent extends Component {
        componentWillMount() {
            const { 
                ___Kontti__GetModel_, 
                ___Kontti__Subscribe_ } = this.context;

            this.modelSubscription = ___Kontti__Subscribe_(receivedModel => {
                if (this.isUnmounted) return;

                const newModel = pick(receivedModel, keys);
                this.setState(newModel);
            })
        }
        
        shouldComponentUpdate(nextProps, nextState) {
            // TODO: Perf check:
            if (!shallowEquals(nextProps, this.props)
                || !shallowEquals(nextState, this.state)
                || !isEqual(nextProps, this.props)
                || !isEqual(nextState, this.state))
                return true;

            // if (!isEqual(nextProps, this.props)
            //     || !isEqual(nextState, this.state))
            //     return true;

            return false;
        }

        componentWillUnmount() {
            // Sets unmounted flag true and disposes subscription
            this.isUnmounted = true;
            this.modelSubscription();
        }

        render() {
            const {props, state} = this;

            const componentProps = isEmpty(props)
                ? state 
                : Object.assign({}, props, state)

            const clonedProps = cloneDeep(componentProps);

            ViewComponent.contextTypes = createViewContextTypes(ViewComponent);

            return <ViewComponent ref={ref && ref} {...clonedProps} />
        }
    }
    
    ListenerComponent.contextTypes = listenerContextTypes;
    return ListenerComponent;
}

export default createListener;
