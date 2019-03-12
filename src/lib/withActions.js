import upperFirst from 'lodash/fp/upperFirst';

const actions = {
    get: (get, key) => () => get()[key],
    set: (set, key) => (val) => set({ [key]: val }),
    put: (put, key) => (val) => put({ [key]: val })
}

export default (action, ...keysParam) => {
    const { name } = action.prototype.name;
    
    if (!Object.keys(actions).includes(name))
        return {}

    const keys = Array.isArray(keysParam[0])
        ? keysParam[0]
        : keysParam;

    return keys.reduce((ret, key) => Object.assign({}, ret, {
        [name + upperFirst(key)]: actions[name](action, key)
    }, {}))
}