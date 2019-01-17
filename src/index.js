import createContainer from './lib/container.jsx';

export const container = createContainer;

const Container = createContainer();

export const provider = Container.provider
    , Consumer        = Container.Consumer
    , PureConsumer    = Container.PureConsumer
    , useKontti       = Container.useKontti
    , withActions     = Container.withActions;

export default {
    container,

    provider,
    Consumer,
    PureConsumer,
    useKontti,
    withActions
}
