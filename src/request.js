import fetch from 'isomorphic-fetch';
import parseXml from '@rgrove/parse-xml';

import parse from './parse';
import {md5} from './util';

const BASE_URL = 'https://nl.citymeal.com/android/android.php';
const PASSWORD = '4ndro1d';

export const makeRequest = async (url, {parameters = [], ...options}) => {
    try {
        let inputMd5 = '';
        for (const parameter of parameters) {
            inputMd5 += parameter;
        }
        parameters.unshift(md5(inputMd5 + PASSWORD));

        let query = parameters.map((parameter, index) => `var${index}=${encodeURIComponent(parameter)}`).join('&');
        query += '&version=5.7&systemversion=24;4.15.3.2&appname=Takeaway.com&language=nl';

        const headers = new Headers();
        headers.set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');

        const response = await fetch(url.length === 0 ? BASE_URL : url, {
            method: 'POST',
            headers,
            body: query,
            ...options
        });

        if (response.status >= 200 && response.status <= 399) {
            const text = await response.text();
            console.log(text);
            return parseXml(text);
        } else {
            throw new Error(`Request failed (${response.status} ${response.statusText}): ${await response.text()}`);
        }
    } catch (err) {
        throw err;
    }
};

export const request = async (definition, data, options) => {
    try {
        const parameters = definition.parameters(data);
        const xml = await makeRequest('', {parameters, ...options});
        return parse(definition.response, xml);
    } catch (err) {
        throw err;
    }
};
