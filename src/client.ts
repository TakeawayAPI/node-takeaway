import {parseXml} from '@rgrove/parse-xml';

import {TakeawayConfig} from './config';
import parse from './parse';
import requests from './requests';
import {md5} from './util';

export interface RequestDefinition {
    parameters: (parameters?: RequestParameters) => string[];
    response: ResponseDefinition;
}

export interface ResponseDefinition {
    [k: string]: string | string[] | ResponseDefinition | ResponseDefinition[];
}

export interface RequestParameters {
    [k: string]: any;
}

export interface RequestOptions {
    format?: 'text' | 'xml' | 'json';
    debug?: boolean;
}

export class TakeawayClient {
    config: TakeawayConfig;

    constructor(config: TakeawayConfig) {
        if (!config || !(config instanceof TakeawayConfig)) {
            throw new Error('Invalid configuration');
        }
        this.config = config;
    }

    getAddresses = (data?: RequestParameters, options?: RequestOptions) =>
        this.request(requests.getAddresses, data, options);
    getBanks = (data?: RequestParameters, options?: RequestOptions) => this.request(requests.getBanks, data, options);
    getCountries = (data?: RequestParameters, options?: RequestOptions) =>
        this.request(requests.getCountries, data, options);
    getDiscounts = (data?: RequestParameters, options?: RequestOptions) =>
        this.request(requests.getDiscounts, data, options);
    getGeoLocation = (data?: RequestParameters, options?: RequestOptions) =>
        this.request(requests.getGeoLocation, data, options);
    getHistory = (data?: RequestParameters, options?: RequestOptions) =>
        this.request(requests.getHistory, data, options);
    getHistoryDetails = (data?: RequestParameters, options?: RequestOptions) =>
        this.request(requests.getHistoryDetails, data, options);
    getLoyaltyPoints = (data?: RequestParameters, options?: RequestOptions) =>
        this.request(requests.getLoyaltyPoints, data, options);
    getMenuCard = (data?: RequestParameters, options?: RequestOptions) =>
        this.request(requests.getMenuCard, data, options);
    getRestaurantData = (data?: RequestParameters, options?: RequestOptions) =>
        this.request(requests.getRestaurantData, data, options);
    getRestaurants = (data?: RequestParameters, options?: RequestOptions) =>
        this.request(requests.getRestaurants, data, options);
    getReviews = (data?: RequestParameters, options?: RequestOptions) =>
        this.request(requests.getReviews, data, options);
    getServerTime = (data?: RequestParameters, options?: RequestOptions) =>
        this.request(requests.getServerTime, data, options);
    getURLs = (data?: RequestParameters, options?: RequestOptions) => this.request(requests.getURLs, data, options);
    login = (data?: RequestParameters, options?: RequestOptions) => this.request(requests.login, data, options);
    order = (data?: RequestParameters, options?: RequestOptions) => this.request(requests.order, data, options);
    resetPassword = (data?: RequestParameters, options?: RequestOptions) =>
        this.request(requests.resetPassword, data, options);

    async request(
        definition: RequestDefinition,
        data?: RequestParameters,
        {format = 'json', debug = false, ...options}: RequestOptions = {}
    ): Promise<any> {
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
            body: parameters
                .map((parameter, index) => `var${index}=${encodeURIComponent(parameter)}`)
                .concat([this.config.getDefaultQuery()])
                .join('&'),
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
    }
}
