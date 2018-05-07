import {Model, BaseModel} from './Model';
import Address from './Address';
import Loyalty from './Loyalty';
import HistoryOrder from './HistoryOrder';

@Model
export default class User extends BaseModel {
    static relationships = ['country', 'addresses', 'loyalty']

    constructor(takeaway, data, country) {
        super(takeaway, data);
        this.country = country;

        if (data.contacts) {
            this.addresses = data.contacts.addresses.map((address) => new Address(takeaway, address));
            delete data.contacts;
        }
    }

    async getLoyalty() {
        try {
            const data = await this.takeaway.getClient().getLoyaltyPoints({
                email: this.email,
                credentials: this.token,
                countryCode: this.country.code,
                siteCode: this.country.siteCode,
                language: this.takeaway.getLanguage()
            });

            this.loyalty = new Loyalty(this.takeaway, data.loyalty);
            return this.loyalty;
        } catch (err) {
            throw err;
        }
    }

    async getHistory(page = 1) {
        try {
            const data = await this.takeaway.getClient().getHistory({
                email: this.email,
                credentials: this.token,
                countryCode: this.country.code,
                siteCode: this.country.siteCode,
                page
            });

            return data.history.orders.map((order) => new HistoryOrder(this.takeaway, order, this));
        } catch (err) {
            throw err;
        }
    }
};
