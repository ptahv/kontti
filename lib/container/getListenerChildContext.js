export default (component) => {
    return {
        Subscriber: {
            // subscribedKeys,
            getPropsChanged: () => component._propsChanged,
            getStoreChanged: () => component._storeChanged
        }
    }
}