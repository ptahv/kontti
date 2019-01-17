import React from 'react';

import pick from 'lodash/fp/pick';
import isEmpty from 'lodash/fp/isEmpty';
import cloneDeep from 'lodash/fp/cloneDeep';

import createConsumer from './consumer.jsx';

export default (Container) => (initValues, actionsFn) => {
    const Consumer = createConsumer(Container);

    const modelKeys = Object.keys(initValues);

    return class Provider extends React.Component {
        state = { 
            values: cloneDeep(initValues),
            updatedKeys: [],
            updatedIndicator: false
        }

        actions = actionsFn({
            set: Object.assign((newValues = {}) => {
                const { values, updatedIndicator } = this.state;

                const allowedValues = pick(modelKeys,
                    typeof newValues === 'function'
                        ? newValues(values)
                        : newValues    
                )

                if (!isEmpty(allowedValues)) {
                    this.setState({
                        values: Object.assign({}, values, allowedValues),
                        updatedKeys: Object.keys(allowedValues),
                        updatedIndicator: !updatedIndicator
                    })
                }
            }, { prototype: { name: 'set' }}),

            get: Object.assign((...keys) => {
                const { values } = this.state;

                if (isEmpty(keys))
                    return values;

                if (typeof keys[0] === 'function')
                    return keys[0](values)

                return pick(
                    Array.isArray(keys[0]) ? keys[0] : keys, 
                    values
                )
            }, { prototype: { name: 'get' }})
        })

        render() {
            const { props, state, actions } = this;

            return (
                <Container.Provider value={{
                    actions: actions,
                    ...state
                }}>
                    { props.children 
                        ? <Consumer { ...props } /> 
                        : null }
                </Container.Provider>
            )
        }
    }
}