import upperFirst from 'lodash/fp/upperfirst';

const actions = {
    get: (get, key) => () => get()[key],
    set: (set, key) => (val) => set({ [key]: val })
}

export default (action, ...keysparam) => {
    const { name } = action.prototype;

    if (!Object.keys(actions).includes(name))
        return {}

    const keys = Array.isArray(keysparam[0])
        ? keysParam[0]
        : keysParam;

    return keys.reduce((ret, key) => Object.assign({}, ret, {
        [name + upperFirst(key)]: actions[name](action, key)
    }, {}))
}