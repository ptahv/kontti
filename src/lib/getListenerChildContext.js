/** 
 * Listener -component is a Component that listens for store changes
 * Can be distributor or subscriber
 */

export default (component) => {
    return {
        Subscriber: {
            getPropsChanged: () => component._propsChanged,
            getStoreChanged: () => component._storeChanged
        }
    }
}