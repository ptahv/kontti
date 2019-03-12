import React from 'react';

import intersection from 'lodash/fp/intersection';

export default class extends React.Component {
    listenedKeys = [];
    modelUpdatedIndicator = null;
    parentUpdatedIndicator = null;

    constructor(props) {
        super();

        this.listenedKeys = Object.keys(props.keysObj);
        this.modelUpdatedIndicator = props.modelUpdatedIndicator;
        this.parentUpdatedIndicator = props.parentUpdatedIndicator;
    }
    
    shouldComponentUpdate(nextProps) {
        const shouldUpdate = (this.parentUpdatedIndicator !== nextProps.parentUpdatedIndicator) 
            || (this.modelUpdatedIndicator !== nextProps.modelUpdatedIndicator
                && intersection(nextProps.updatedKeys, this.listenedKeys).length)
            
        this.modelUpdatedIndicator = nextProps.modelUpdatedIndicator;
        this.parentUpdatedIndicator = nextProps.parentUpdatedIndicator;

        return shouldUpdate;
    }

    render() {
        const { get, actions, updatedKeys, children } = this.props;

        return !children ? null
            : typeof children === 'function'
                ? children(get(this.listenedKeys), actions, { updatedKeys })
                : children;
    }
}