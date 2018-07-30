/**
 * Copyright (c) 2015-present, Petri Tahvanainen.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export default (children, ...paramsArray) => {
    if (!children)
        return null;

    else if (typeof children === 'function')
        return children(...paramsArray);
        
    return children;
}