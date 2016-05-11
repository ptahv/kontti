/**
 * Copyright 2015-present, Petri Tahvanainen.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. 
 *
 */

const createDataMerger = () => {
    let merging = false;
    let newDataArray = [];

    const _mergeData = (data = {}) => {
        if (newDataArray.length > 0) {
            const newData = newDataArray[0];

            data = Object.assign(data, newData);
            newDataArray.shift();

            return _mergeData(data);
        }

        else {
            return data;
        }
    }

    const merge = (newData) => {
        newDataArray.push(newData);

        if (!merging) {
            merging = true;
            const mergedData = _mergeData();
            merging = false;

            return mergedData;
        }

        return {};
    }

    const isMerging = () => merging;

    return {
        isMerging,
        merge
    }
}

export default createDataMerger;