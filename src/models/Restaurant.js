import {Model, BaseModel} from './Model';

import Address from './Address';
import Category from './Category';
import Review from './Review';

@Model
export default class Restaurant extends BaseModel {
    static relationships = ['address', 'categories']

    constructor(takeaway, data, country) {
        super(takeaway, data);
        this.country = country;

        this.address = new Address(takeaway, data.address);
        delete data.address;
    }

    async getMenu() {
        try {
            const data = await this.takeaway.getClient().getMenuCard({
                restaurantId: this.id,
                country: this.country.code,
                // postalCode: '',
                latitude: this.address.latitude,
                longitude: this.address.longitude
            });
            this.data = Object.assign({}, this.data, data.restaurant);

            this.categories = this.data.menu[0].categories.categories.map((category) => new Category(this.takeaway, category));
            delete this.data.menu[0].categories;
            return this.categories;
        } catch (err) {
            throw err;
        }
    }

    async getReviews(page = 1) {
        try {
            const data = await this.takeaway.getClient().getReviews({
                restaurantId: this.id,
                page
            });

            return data.reviews.reviews.map((review) => new Review(this.takeaway, review));
        } catch (err) {
            throw err;
        }
    }

    async getTime(orderMode) {
        try {
            const data = await this.takeaway.getClient().getServerTime({
                country: this.country.code,
                restaurantId: this.id,
                orderMode
            });

            this.open = data.time.open;
            return data.time;
        } catch (err) {
            throw err;
        }
    }
};
