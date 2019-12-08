import {Takeaway} from '../api';
import {OrderInput} from '../inputs/OrderInput';

import {Model, BaseModel, Data} from './Model';
import {User} from './User';
import {Address} from './Address';
import {Restaurant} from './Restaurant';
import {Order} from './Order';

interface Translations {
    bg?: string;
    da?: string;
    de?: string;
    en?: string;
    fr?: string;
    it?: string;
    lu?: string;
    nl?: string;
    pl?: string;
    pt?: string;
    ro?: string;
    sv?: string;
    vi?: string;
}

@Model
export class Country extends BaseModel {
    static relationships = [];

    id?: string;
    name?: string;
    siteUrl?: string;
    pregMatch1?: RegExp;
    pregMatch2?: RegExp;
    pregMatch3?: RegExp;
    message1?: string;
    message2?: string;
    twitter?: string;
    email?: string;
    logoUrl?: string;
    iconUrl?: string;
    headerUrl?: string;
    code?: string;
    siteCode?: string;
    pickupEnabled?: boolean;
    loyaltyShopEnabled?: boolean;
    languages?: {
        languages?: string[];
    };
    descriptions?: Translations;
    movies?: Translations;
    enabledRecurringPayments?: {
        methods?: string[];
    };
    autoComplete?: {
        gp: {
            id?: string;
            apiKey?: string;
            poweredBy?: string;
        }
        nm: {
            id?: string;
            url?: string;
            apiKey?: string;
        }
        preferred?: string;
    };

    constructor(takeaway: Takeaway, data: Data) {
        super(takeaway, data);
    }

    async login(email: string, credentials: string) {
        const data = await this.takeaway.getClient().login({
            email,
            credentials,
            countryCode: this.code,
            siteCode: this.siteCode
        });
        return new User(this.takeaway, data.login, this);
    }

    async socialLogin(socialType: string, socialToken: string) {
        const data = await this.takeaway.getClient().login({
            socialType,
            socialToken,
            countryCode: this.code,
            siteCode: this.siteCode
        });
        return new User(this.takeaway, data.login, this);
    }

    async getLocation(latitude: string, longitude: string) {
        const data = await this.takeaway.getClient().getGeoLocation({
            country: this.code,
            latitude,
            longitude
        });
        return new Address(this.takeaway, data.location);
    }

    async getRestaurants(postalCode: string, latitude: string, longitude: string) {
        const data = await this.takeaway.getClient().getRestaurants({
            country: this.code,
            postalCode,
            latitude,
            longitude,
            language: this.takeaway.getLanguage()
        });
        return data.restaurants.restaurants.map((restaurant) => new Restaurant(this.takeaway, restaurant, this));
    }

    async order(orderInput: OrderInput) {
        const data = await this.takeaway.getClient().order({
            name: orderInput.name,
            companyName: orderInput.companyName
            // TODO
        });
        return new Order(this.takeaway, data);
    }
}

export default Country;
