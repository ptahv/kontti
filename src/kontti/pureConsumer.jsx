import React from 'react';

export default (Consumer) => class PureConsumer extends React.Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return <Consumer {...this.props} />
    }
}