import React from 'react';

import Kontti from './kontti.jsx';

export default (Container) => 
    class Consumer extends React.Component {
        parentUpdatedIndicator = false;

        render() {
            const {children, ...keyProps} = this.props;

            this.parentUpdatedIndicator = !this.parentUpdatedIndicator;

            return (
                <Container.Consumer>
                    {(ctx) => (
                        <Kontti 
                            keysObj={keyProps}
                            parentUpdatedIndicator={this.parentUpdatedIndicator}
                            { ...ctx } 
                            >
                            {children}
                        </Kontti>
                    )}
                </Container.Consumer>
            )
        }
    }