import React from 'react';

import Kontti from './kontti.jsx';

import createStore from './store.js';

export default (Container) => (initValues, actionsFn) =>
    class Provider extends React.Component {
        updateSent = true;
        parentUpdatedIndicator = false;

        constructor() {
            super();

            const store = createStore(initValues);

            this.state = {
                get: store.get,

                updatedKeys: [],
                modelUpdatedIndicator: false,

                actions: actionsFn({
                    'get': Object.assign(store.get, 
                        { prototype: { name: 'get' }}),

                    'set': Object.assign((values) => store.update(
                        values,
                        ({ updatedKeys }) => {
                            if (!this.updateSent) {
                                this.state.updatedKeys = this.state.updatedKeys.concat(updatedKeys);
                            
                            } else {
                                this.updateSent = false;
                                this.setState({
                                    updatedKeys,
                                    modelUpdatedIndicator: !this.state.modelUpdatedIndicator
                                })
                            }
                        }),
                        { prototype: { name: 'set' }}),

                    'put': Object.assign((values) => store.update(
                        values,
                        ({ updatedKeys }) => {
                            this.state.updatedKeys = updatedKeys;
                        }),
                        { prototype: { name: 'put' }})
                })
            }
        }
        
        shouldComponentUpdate(nextProps, nextState) {
            if (this.state.modelUpdatedIndicator === nextState.modelUpdatedIndicator)
                this.parentUpdatedIndicator = !this.parentUpdatedIndicator;

            return true;
        }

        render() {
            this.updateSent = true;

            const {
                children, 
                ...keyProps
            } = this.props;
            
            return (
                <Container.Provider value={this.state}>
                    <Kontti
                        keysObj={keyProps}
                        parentUpdatedIndicator={this.parentUpdatedIndicator}
                        {...this.state}
                        >
                        {children}
                    </Kontti>
                </Container.Provider>
            )
        }
    }