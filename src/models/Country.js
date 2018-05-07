import {Model, BaseModel} from './Model';
import Restaurant from './Restaurant';

@Model
export default class Country extends BaseModel {
    static relationships = []

    constructor(takeaway, data) {
        super(takeaway, data);
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
            return data.restaurants.restaurants.map((restaurant) => new Restaurant(this.takeaway, restaurant));
        } catch (err) {
            throw err;
        }
    }
};
