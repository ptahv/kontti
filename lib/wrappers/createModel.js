/**
 * Copyright 2015-present, Petri Tahvanainen.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. 
 *
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
    mapValues, 
    isEmpty,
    compose } from 'lodash';

import {
    isObject, 
    isFunction,
    cloneDeep,
    createViewContextTypes } from '../core/helper.js';
    
import createModelStream from '../core/createModelStream.js';

const {func, object} = React.PropTypes;
const childContextTypes = {
    ___Kontti__GetModel_: func.isRequired,
    ___Kontti__Subscribe_: func.isRequired,
    Model: object.isRequired
};

const createModel = (initModel, actions, {testing} = {}) => {
    const modelComponent = (ViewComponent, {ref}={}) => {
        class ModelerComponent extends Component {
            componentWillMount() {
                // Create modelStream with component, 
                // will be destroyed with component as well
                //
                const clonedModel = cloneDeep(initModel); 
                this.__Kontti__ModelStream_ = createModelStream(clonedModel);
            }

            getChildContext() {
                const {__Kontti__ModelStream_} = this;
                
                const modelActions = mapValues(actions, action => {
                    if (isObject(action)) {
                        return () => {
                            __Kontti__ModelStream_.mergeModel(action);
                            return modelActions;
                        }
                    } 
                    else if (isFunction(action)) {
                        return (...args) => {
                            __Kontti__ModelStream_.mergeModel(action.apply(this, args));
                            return modelActions;
                        }
                    }
                });
                
                return {
                    ___Kontti__GetModel_: __Kontti__ModelStream_.getModel,
                    ___Kontti__Subscribe_: __Kontti__ModelStream_.subscribe,
                    Model: modelActions
                }
            }

            render() {
                const { props } = this;

                ViewComponent.contextTypes = createViewContextTypes(ViewComponent);

                return (
                    <ViewComponent 
                        ref={ref && ref} 
                        {...props} 
                        />
                )
            }
        };

        ModelerComponent.childContextTypes = childContextTypes;
        return ModelerComponent;
    }

    if (testing) {
        const modelActions = mapValues(actions, (action) => {
            if (isObject(action)) {
                return () => {
                    initModel = Object.assign(initModel, action);
                    return modelActions;
                }
            } 
            else if (isFunction(action)) {
                return (...args) => {
                    initModel = Object.assign(initModel, action.apply(this, args))
                    return modelActions;
                }
            }
        });

        return Object.assign(modelComponent, {
            setModel(newModel) {
                initModel = newModel
            },
            getModel() {
                return initModel;
            },
            actions: modelActions
        })
    }
    return modelComponent;
}

export default createModel;
