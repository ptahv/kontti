/**
 * Copyright 2015-present, Petri Tahvanainen.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. 
 *
 */
 
import {compose, isEmpty, isEqual} from 'lodash';
import {createStream} from 'striimi.js';

import {
    samePropValues,
    mergeIfNotEqualProps } from './helper.js';

import createDataMerger from '../core/createDataMerger.js';

const createModelStream = (initModel) => {
    const modelStream = createStream(initModel);

    const subscribe = modelStream.subscribe;
    const getModel = modelStream.getValue;
    const setModel = modelStream.emit;

    const newModelChangesMerger = createDataMerger();
    const mergeModel = (receivedModel) => {
        const newModelChangesObj = newModelChangesMerger.merge(receivedModel);

        if (!newModelChangesMerger.isMerging() && !isEmpty(newModelChangesObj)) {

            const currentModel = getModel();
            const newMergedModel = Object.assign({}, currentModel, newModelChangesObj);

            const modelChanged = !isEqual(currentModel, newMergedModel)

            if (!newModelChangesMerger.isMerging() && modelChanged) {
                setModel(newMergedModel);
            }
        }
    }

    return {
        subscribe,
        getModel,
        setModel,
        mergeModel
    }
};

export default createModelStream;
