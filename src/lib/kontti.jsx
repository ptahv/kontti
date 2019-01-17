import React from 'react';

import intersection from 'lodash/fp/intersection';

export default class extends React.Component {
    listenedKeys = [];
    updatedIndicator = null;

    constructor(props) {
        super();

        this.listenedKeys = props.listenedKeys;
        this.updatedIndicator = props.updatedIndicator;
    }
    
    shouldComponentUpdate(nextProps) {
        const shouldUpdate = this.updatedIndicator !== nextProps.updatedIndicator
            && intersection(nextProps.updatedKeys, this.listenedKeys).length
        
        this.updatedIndicator = nextProps.updatedIndicator;

        return shouldUpdate;
    }

    render() {
        const { values, actions, children } = this.props;
        
        return !children ? null
            : typeof children === 'function'
                ? children(values, actions)
                : children;
    }
}