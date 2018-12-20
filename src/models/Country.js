import {Model, BaseModel} from './Model';
import User from './User';
import Address from './Address';
import Restaurant from './Restaurant';

@Model
export default class Country extends BaseModel {
    static relationships = []

    constructor(takeaway, data) {
        super(takeaway, data);
    }

    async login(email, credentials) {
        try {
            const data = await this.takeaway.getClient().login({
                email,
                credentials,
                countryCode: this.code,
                siteCode: this.siteCode
            });
            return new User(this.takeaway, data.login, this);
        } catch (err) {
            throw err;
        }
    }

    async socialLogin(socialType, socialToken) {
        try {
            const data = await this.takeaway.getClient().login({
                socialType,
                socialToken,
                countryCode: this.code,
                siteCode: this.siteCode
            });
            return new User(this.takeaway, data.login, this);
        } catch (err) {
            throw err;
        }
    }

    async getLocation(latitude, longitude) {
        try {
            const data = await this.takeaway.getClient().getGeoLocation({
                country: this.code,
                latitude,
                longitude
            });
            return new Address(data.location);
        } catch (err) {
            throw err;
        }
    }

    async getRestaurants(postalCode, latitude, longitude) {
        try {
            const data = await this.takeaway.getClient().getRestaurants({
                country: this.code,
                postalCode,
                latitude,
                longitude,
                language: this.takeaway.getLanguage()
            });
            return data.restaurants.restaurants.map((restaurant) => new Restaurant(this.takeaway, restaurant, this));
        } catch (err) {
            throw err;
        }
    }
};
