const cloneDeep = (obj) => {
    if (obj === null || typeof obj !== "object") 
        return obj;

    if (obj.constructor !== Object && obj.constructor !== Array) 
        return obj;
    
    if (obj.constructor === Date || obj.constructor === RegExp || obj.constructor === Function ||
        obj.constructor === String || obj.constructor === Number || obj.constructor === Boolean)
        return new obj.constructor(obj);

    /* eslint-disable guard-for-in */
    var deepClonedObj = new obj.constructor();
    for (var name in obj)
    {
        deepClonedObj[name] = typeof deepClonedObj[name] === "undefined" 
            ? cloneDeep(obj[name]) 
            : deepClonedObj[name];
    }
    /* eslint-enable guard-for-in */

    return deepClonedObj; 
}

export default cloneDeep;