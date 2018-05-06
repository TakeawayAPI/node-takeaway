import 'babel-polyfill';

import crypto from 'crypto';
import fetch from 'isomorphic-fetch';

import config from './config';

console.log(`TEST: ${config.test}`);

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

        return await fetch(url.length === 0 ? BASE_URL : url, {
            method: 'POST',
            headers,
            body: query,
            ...options
        });
    } catch (err) {
        throw err;
    }
};

(async () => {
    try {
        const response = await makeRequest('', {
            parameters: [
                'getrestaurants',
                '7523',
                '1', // 1 = Netherlands
                '52.2345951',
                '6.8979074',
                'nl',
                '0',
                '1' // Is location accurate
            ]
        });

        console.log(response.status, response.statusText, response.headers.get('Content-Type'));

        console.log(await response.text());
    } catch (err) {
        console.error(err);
    }
})();
