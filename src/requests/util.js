export const TYPES = '!#.$/';

export const reverseChild = (key, value) => {
    if (typeof value === 'object') {
        const child = reverse(value);
        child._self = key;
        return [value._self, child];
    } else {
        if (TYPES.includes(value.charAt(0))) {
            return [value.substring(1), `${value.charAt(0)}${key}`];
        } else {
            return [value, key];
        }
    }
};

export const reverse = (definition) => {
    const output = {};
    for (const [key, value] of Object.entries(definition)) {
        if (key.startsWith('_')) {
            continue;
        }

        if (Array.isArray(value)) {
            const [k, v] = reverseChild(key, value[0]);
            output[k] = [v];
        } else {
            const [k, v] = reverseChild(key, value);
            output[k] = v;
        }
    }
    return output;
};
