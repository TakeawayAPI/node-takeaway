import {Takeaway} from '../api';

import {Model, BaseModel} from './Model';
import {User} from './User';
import {Address} from './Address';
import {Restaurant} from './Restaurant';
import {Order} from './Order';

@Model
export class Country extends BaseModel {
    static relationships = [];

    constructor(takeaway: Takeaway, data) {
        super(takeaway, data);
    }

    async login(email, credentials) {
        const data = await this.takeaway.getClient().login({
            email,
            credentials,
            countryCode: this.code,
            siteCode: this.siteCode
        });
        return new User(this.takeaway, data.login, this);
    }

    async socialLogin(socialType, socialToken) {
        const data = await this.takeaway.getClient().login({
            socialType,
            socialToken,
            countryCode: this.code,
            siteCode: this.siteCode
        });
        return new User(this.takeaway, data.login, this);
    }

    async getLocation(latitude, longitude) {
        const data = await this.takeaway.getClient().getGeoLocation({
            country: this.code,
            latitude,
            longitude
        });
        return new Address(this.takeaway, data.location);
    }

    async getRestaurants(postalCode, latitude, longitude) {
        const data = await this.takeaway.getClient().getRestaurants({
            country: this.code,
            postalCode,
            latitude,
            longitude,
            language: this.takeaway.getLanguage()
        });
        return data.restaurants.restaurants.map((restaurant) => new Restaurant(this.takeaway, restaurant, this));
    }

    async order(orderInput) {
        const data = await this.takeaway.getClient().order({
            name: orderInput.name,
            companyName: orderInput.companyName
            // TODO
        });
        return new Order(this.takeaway, data);
    }
}

export default Country;
