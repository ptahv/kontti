export default (children, ...paramsArray) => {
    if (!children)
        return null;

    else if (typeof children === 'function')
        return children(...paramsArray);
        
    return children;
}