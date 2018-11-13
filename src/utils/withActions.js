function upperFirst(str) {
    return str[0].toUpperCase() + str.substring(1);
}

function pickAction(methodName) {
    return (key, method) => ({
        set:  (val) => method({[key]: val}),
        get: () => method()[key]
    })[methodName]
}

export default (method, ...keys) => {
    const methodName = method.prototype.name;
    const action = pickAction(methodName)

    return keys.reduce((curr, key) => ({
        ...curr,
        [methodName + upperFirst(key)]: action(key, method)
    }), {});
}

