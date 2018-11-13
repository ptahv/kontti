import React from 'react';
import Kontti from './kontti.js';

export default (Container) => ({children, ...listenedKeysObj}) => (
    <Container.Consumer>
        {(store) => (
            <Kontti 
                store={store}
                listenedKeys={Object.keys(listenedKeysObj)}
                >
                {children}
            </Kontti>
        )}
    </Container.Consumer>
)