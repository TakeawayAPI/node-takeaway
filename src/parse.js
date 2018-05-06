const parseChildren = (definition, xml) => {
    const data = {};

    if (!xml.children) {
        throw new Error(`XML ${xml.type} "${xml.name}" has no children`);
    }

    for (const child of xml.children) {
        // Skip text children, these are just newlines or spaces
        if (child.type === 'text') {
            continue;
        }

        if (!definition[child.name]) {
            console.log(`Unknown tag: "${child.name}", parent tag: "${xml.name}"`);
        } else {
            const def = definition[child.name];

            if (Array.isArray(def)) {
                let key = null;
                let value = null;
                if (typeof def[0] === 'object') {
                    key = def[0]._self;
                    value = parseChildren(def[0], child);
                } else {
                    key = def[0];
                    value = child.children.length === 0 ? '' : child.children[0].text;
                }

                if (!data[key]) {
                    data[key] = [];
                }
                data[key].push(value);
            } else if (typeof def === 'object') {
                data[def._self] = parseChildren(def, child);
            } else {
                data[def] = child.children.length === 0 ? '' : child.children[0].text;
            }
        }
    }

    return data;
};

const parse = (definition, xml) => {
    return parseChildren(definition, xml);
};

export default parse;
