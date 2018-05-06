import 'babel-polyfill';

import crypto from 'crypto';
import {inspect} from 'util';
import fetch from 'isomorphic-fetch';
import parseXml from '@rgrove/parse-xml';

import parse from './parse';
import {getRestaurants} from './requests';

const BASE_URL = 'https://nl.citymeal.com/android/android.php';
const PASSWORD = '4ndro1d';

const md5 = (data) => {
    return crypto.createHash('md5').update(data).digest('hex');
};

const makeRequest = async (url, {parameters = [], ...options}) => {
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

        console.log('Sending:', query);

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

const request = async (definition, data, options) => {
    try {
        const parameters = definition.parameters(data);
        const xml = await makeRequest('', {parameters, ...options});
        return parse(definition.response, xml);
    } catch (err) {
        throw err;
    }
};

(async () => {
    // console.log(inspect(getRestaurants.response, false, null));

    try {
        const data = await request(getRestaurants, {
            postalCode: '7523CK',
            country: '1',
            latitude: '52.2345951',
            longitude: '6.8979074',
            language: 'nl'
        });

        console.log(inspect(data.rs.restaurants[0], false, null));
    } catch (err) {
        console.error(err);
    }
})();
