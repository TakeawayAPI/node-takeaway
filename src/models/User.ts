import {Takeaway} from '../api';

import {Model, BaseModel} from './Model';
import {Address} from './Address';
import {Country} from './Country';
import {Loyalty} from './Loyalty';
import {HistoryOrder} from './HistoryOrder';

@Model
export class User extends BaseModel {
    static relationships = ['country', 'addresses', 'loyalty'];

    country: Country;
    addresses: Address[];
    loyalty: Loyalty;

    constructor(takeaway: Takeaway, data, country: Country) {
        super(takeaway, data);
        this.country = country;

        if (data.contacts) {
            this.addresses = data.contacts.addresses.map((address) => new Address(takeaway, address));
            delete data.contacts;
        }
    }

    async getLoyalty() {
        const data = await this.takeaway.getClient().getLoyaltyPoints({
            email: this.email,
            credentials: this.token,
            countryCode: this.country.code,
            siteCode: this.country.siteCode,
            language: this.takeaway.getLanguage()
        });

        this.loyalty = new Loyalty(this.takeaway, data.loyalty);
        return this.loyalty;
    }

    async getHistory(page = 1) {
        const data = await this.takeaway.getClient().getHistory({
            email: this.email,
            credentials: this.token,
            countryCode: this.country.code,
            siteCode: this.country.siteCode,
            page
        });

        return data.history.orders.map((order) => new HistoryOrder(this.takeaway, order, this));
    }
}
