import {Model, BaseModel} from './Model';

import Address from './Address';
import Category from './Category';

@Model
export default class Restaurant extends BaseModel {
    static relationships = ['address']

    constructor(takeaway, data) {
        super(takeaway, data);

        this.address = new Address(takeaway, data.address);
        delete data.address;
    }

    async getMenu() {
        try {
            const data = await this.takeaway.getClient().getMenuCard({
                restaurantId: this.id,
                country: this.code,
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
};
