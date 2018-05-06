import fetch from 'isomorphic-fetch';
import parseXml from '@rgrove/parse-xml';

import TakeawayConfig from './config';
import parse from './parse';
import requests from './requests';
import {md5} from './util';

class TakeawayClient {
    constructor(config) {
        if (!config || !(config instanceof TakeawayConfig)) {
            throw new Error('Invalid configuration');
        }
        this.config = config;

        // Add request functions
        for (const [name, request] of Object.entries(requests)) {
            this[name] = this.request.bind(this, request);
        }
    }

    async request(definition, data, {format = 'json', debug = false, ...options} = {}) {
        try {
            // Generate parameter list from data
            const parameters = definition.parameters(data);

            // Generate MD5 hash of parameters and password
            let inputMd5 = '';
            for (const parameter of parameters) {
                inputMd5 += parameter;
            }
            parameters.unshift(md5(inputMd5 + this.config.getPassword()));

            // Set headers
            const headers = new Headers();
            headers.set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');

            // Make the request
            const response = await fetch(this.config.getUrl(), {
                method: 'POST',
                headers,
                body: parameters.map((parameter, index) => `var${index}=${encodeURIComponent(parameter)}`).concat([this.config.getDefaultQuery()]).join('&'),
                ...options
            });

            // Check if the request was successful
            if (response.status >= 200 && response.status <= 399) {
                const text = await response.text();
                if (debug) {
                    console.debug(text);
                }

                // Return raw XML text
                if (format === 'text') {
                    return text;
                }

                // Parse the raw XML to a JS representation
                const xml = parseXml(text);
                if (format === 'xml') {
                    return xml;
                }

                // Parse the XML representation to JSON with beatified names
                if (format === 'json') {
                    return parse(definition.response, xml);
                }

                // Unknown format, return the raw response
                return response;
            } else {
                throw new Error(`Request failed (${response.status} ${response.statusText}): ${await response.text()}`);
            }
        } catch (err) {
            throw err;
        }
    }
};

export default TakeawayClient;
