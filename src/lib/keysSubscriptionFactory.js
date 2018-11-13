import intersection from 'lodash/fp/intersection';

export default ({keysListener, listenedKeys, triggerUpdate}) => {
    let unmounted = null;

    let _storeSubscription = listenedKeys && keysListener((updatedKeys) => {
        if (unmounted)
            return;
        
        if (!intersection(updatedKeys, listenedKeys).length)
            return;
            
        triggerUpdate();
    });

    return () => {
        unmounted = true;

        if (_storeSubscription)
            _storeSubscription();
    }
}