import ReactDOM from 'react-dom';
import fp from 'lodash/fp';

export default (component, konttiType) => {
    const typeName = fp.upperFirst(konttiType);
    const storeName = typeName + 'Store'

    const {
        get,
        actions,
        subscribe,
        defaultActions,
    } = component._store;

    return {
        [typeName]: Object.assign(
            (fn) => ReactDOM.unstable_batchedUpdates(() => fn(defaultActions)), 
            defaultActions
        ), 

        [storeName]: actions,

        _store: {
            get,
            subscribe
        }
    }
}