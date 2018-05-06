export const reverse = (definition) => {
    const output = {};
    for (const [key, value] of Object.entries(definition)) {
        if (key.startsWith('_')) {
            continue;
        }

        if (typeof value === 'object') {
            if (Array.isArray(value)) {
                output[value[0]._self] = [reverse(value[0])];
                output[value[0]._self][0]._self = key;
            } else {
                output[value._self] = reverse(value);
                output[value._self]._self = key;
            }
        } else {
            output[value] = key;
        }
    }
    return output;
};
