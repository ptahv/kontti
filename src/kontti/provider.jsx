import React from 'react';
import Kontti from './kontti.js';

import createStore from './store.js'

export default (Container) => (values, actionsFn) => (
    class Provider extends React.Component {
        constructor() {
            super();

            const store = createStore(values, actionsFn);

            this.render = () => {
                const {children, ...listenedKeysObj} = this.props;

                return (
                    <Container.Provider value={store}>
                        <Kontti
                            store={store}
                            listenedKeys={Object.keys(listenedKeysObj)}
                            >
                            {children}
                        </Kontti>
                    </Container.Provider>
                )
            }
        }
    }
)