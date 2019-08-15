import {Model, BaseModel} from './Model';
import User from './User';
import Address from './Address';
import Restaurant from './Restaurant';

@Model
class Country extends BaseModel {
    static relationships = []

    constructor(takeaway, data) {
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
        return new Address(data.location);
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
}

export default Country;
