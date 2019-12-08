import {Takeaway} from '../api';

import {Model, BaseModel} from './Model';
import {Address} from './Address';
import {Country} from './Country';
import {Loyalty} from './Loyalty';
import {HistoryOrder} from './HistoryOrder';

@Model
export class User extends BaseModel {
    static relationships = ['country', 'addresses', 'loyalty'];

    id?: string;
    token?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    oldOrders?: string;
    ac?: string;
    social?: {
        id?: string;
        username?: string;
    };
    migrated?: boolean;
    country: Country;
    addresses: Address[];
    loyalty: Loyalty;

    constructor(takeaway: Takeaway, data, country: Country) {
        super(takeaway, data);
        this.country = country;

        if (data.contacts) {
            this.addresses = data.contacts.addresses.map((address: any) => new Address(takeaway, address));
            delete data.contacts;
        } else {
            this.addresses = [];
        }
    }

    async getLoyalty(): Promise<Loyalty> {
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

    async getHistory(page = 1): Promise<HistoryOrder[]> {
        const data = await this.takeaway.getClient().getHistory({
            email: this.email,
            credentials: this.token,
            countryCode: this.country.code,
            siteCode: this.country.siteCode,
            page
        });

        return data.history.orders.map((order: any) => new HistoryOrder(this.takeaway, order, this));
    }
}
