import React from 'react';

import pick from 'lodash/fp/pick';

export default (Container) => (...keys) => {
    const ctx = React.useContext(Container);
    
    if (!ctx) 
        return [];
    
    return [
        keys.length && pick(keys, ctx.values) || {},
        ctx.actions
    ];
}