import {ResponseDefinition} from '../client';

export const TYPES = '!#.$/*';

export const reverseChild = (key: string, value: string | ResponseDefinition): [string, string | ResponseDefinition] => {
    if (typeof value === 'object') {
        // Type hint
        value = value as ResponseDefinition;

        const child: ResponseDefinition = reverse(value);
        child._self = key;
        return [value._self as string, child];
    } else {
        value = value as string;

        if (TYPES.includes(value.charAt(0))) {
            return [value.substring(1), `${value.charAt(0)}${key}`];
        } else {
            return [value, key];
        }
    }
};

export const reverse = (definition: ResponseDefinition) => {
    const output: ResponseDefinition = {};
    for (const [key, value] of Object.entries(definition)) {
        if (key.startsWith('_')) {
            continue;
        }

        if (Array.isArray(value)) {
            const [k, v] = reverseChild(key, value[0]);
            output[k] = [v] as (string[] | ResponseDefinition[]);
        } else {
            const [k, v] = reverseChild(key, value);
            output[k] = v;
        }
    }
    return output;
};
