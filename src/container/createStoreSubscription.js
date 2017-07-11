import fp from 'lodash/fp';

export default (component, subscribedKeys) => {
    return component._store.subscribe((updatedKeys) => {
        if (component._isUnmounted)
            return;

        if (fp.intersection(updatedKeys, subscribedKeys).length === 0)
            return;

        component._storeChanging = true;
        component._storeChanged = true;

        component.setState({})
    })
}