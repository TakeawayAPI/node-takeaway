import TakeawayConfig from './config';
import TakeawayClient from './client';
import {Country} from './models';

export default class Takeaway {
    constructor(client) {
        if (client instanceof TakeawayConfig) {
            this.client = new TakeawayClient(client);
        } else if (client instanceof TakeawayClient) {
            this.client = client;
        } else {
            this.client = new TakeawayClient(new TakeawayConfig());
        }
    }

    getClient() {
        return this.client;
    }

    getConfig() {
        return this.getClient().config;
    }

    getLanguage() {
        return this.getConfig().language;
    }

    async getCountries() {
        const data = await this.getClient().getCountries();
        return data.config.countries.map((country) => new Country(this, country, {hasLazyLoaded: true}));
    }

    async getCountryById(id) {
        const countries = await this.getCountries();
        return countries.filter((country) => country.id === id)[0];
    }
};
