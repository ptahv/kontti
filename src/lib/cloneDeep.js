const cloneDeep = (obj) => {
    if (obj === null || typeof obj !== "object") 
        return obj;

    if (obj.constructor !== Object && obj.constructor !== Array) 
        return obj;
    
    if (obj.constructor === Date || obj.constructor === RegExp || obj.constructor === Function ||
        obj.constructor === String || obj.constructor === Number || obj.constructor === Boolean)
        return new obj.constructor(obj);

    /* eslint-disable guard-for-in */
    let clonedObj = new obj.constructor();
    for (let name in obj)
    {
        clonedObj[name] = typeof clonedObj[name] === "undefined" 
            ? cloneDeep(obj[name]) 
            : clonedObj[name];
    }
    /* eslint-enable guard-for-in */

    return clonedObj; 
}

export default cloneDeep;