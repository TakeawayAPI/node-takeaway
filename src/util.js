import crypto from 'crypto';

export const md5 = (data) => {
    return crypto.createHash('md5').update(data).digest('hex');
};

export const print = (xml) => {
    if (!xml) {
        return;
    }

    if (xml.type === 'document') {
        for (const child of xml.children) {
            print(child);
        }
    } else if (xml.type === 'element') {
        let attributes = Object.entries(xml.attributes).map(([key, value]) => `${key}="${value}"`).join(' ');
        if (attributes !== '') {
            attributes = ` ${attributes}`;
        }

        if (xml.children.length === 1 && xml.children[0].type === 'text') {
            console.log(`<${xml.name}${attributes}>${xml.children[0].text}</${xml.name}>`);
        } else if (xml.children.length > 0) {
            console.log(`<${xml.name}${attributes}>`);
            console.group();
            for (const child of xml.children) {
                print(child);
            }
            console.groupEnd();
            console.log(`</${xml.name}>`);
        } else {
            console.log(`<${xml.name}${attributes} />`);
        }
    } else if (xml.type === 'text') {
        if (xml.text.trim().length > 0) {
            console.log(xml.text);
        }
    }
};
