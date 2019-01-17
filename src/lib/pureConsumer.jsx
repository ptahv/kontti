import React from 'react';

import createConsumer from './consumer.jsx';

export default (Container) => {
    const Consumer = createConsumer(Container)

    return class PureConsumer extends React.Component {
        shouldComponentUpdate() {
            return false;
        }

        render() {
            return <Consumer {...this.props} />
        }
    }
}