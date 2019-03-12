import React from 'react';

import Kontti from './kontti.jsx';

export default (Container) => ({ children, ...keyProps }) => (
    <Container.Consumer>
        {(ctx) => (
            <Kontti 
                keysObj={keyProps}
                { ...ctx } 
                >
                {children}
            </Kontti>
        )}
    </Container.Consumer>
)
