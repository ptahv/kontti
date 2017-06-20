import fp from 'lodash/fp';

function getSubscribedKeys(args) {
	if (fp.isString(args[0])) {
		const keys = args.slice(0,
			args.findIndex(fp.isFunction)
		);

		return keys;

	} else if (fp.isPlainObject(args[0])) {
		const propTypes = args[0];
		return Object.keys(propTypes);
	}

	return [];
}

function getPropTypes (args) {
	if (fp.isPlainObject(args[0]))
		return args[0];

	return {};
}

function getComponent(args) {
	return args.find(fp.isFunction);
}

function getOptions(args) {
    const componentIndex = args.findIndex(fp.isFunction);
    if (args.length === componentIndex + 2)
        return args[componentIndex + 1];

    return {}
}

export default (...args) => {
	return {
		subscribedKeys: getSubscribedKeys(args),
		propTypes: getPropTypes(args),
		ViewComponent: getComponent(args),
        options: getOptions(args)
	}
}