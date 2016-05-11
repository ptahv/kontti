/**
 * Copyright 2015-present, Petri Tahvanainen.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. 
 *
 */

import React, {Component} from 'react';
import {mapValues} from 'lodash';

import {isFunction, isObject} from '../core/helper.js';

const createState = (initState, actions) => (
	(ViewComponent, {ref} = {}) => (
		class StateComponent extends Component {
			componentWillMount() {
				this.setState(initState);

				this.stateActions = mapValues(actions, action => {
					if (isObject(action)) {
						return () => {
							this.setState(action);
							return this.stateActions;
						}

					} else if (isFunction(action)) {
						return (...args) => {
							this.setState(action.apply(this, args));
							return this.stateActions;
						}
					}
				})
			}

			render() {
				const {props, state, stateActions} = this;
				
				const componentProps = Object.assign({}, props, state);

				return (
					<ViewComponent 
						State={stateActions}
						ref={ref && ref} 
						{...componentProps} 
						/>
				)
			}
		}
	)
)

export default createState;