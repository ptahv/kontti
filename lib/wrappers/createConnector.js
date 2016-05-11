/**
 * Copyright 2015-present, Petri Tahvanainen.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. 
 *
 */

import React, {Component} from 'react';

import { createViewContextTypes } from '../core/helper.js';

const createConnector = (ViewComponent, {ref}={}) => (
    class ConnectorComponent extends Component {
        render() {
            const {props} = this;
            ViewComponent.contextTypes = createViewContextTypes(ViewComponent);
            return <ViewComponent ref={ref && ref} {...props} />
        }
    }
)

export default createConnector;