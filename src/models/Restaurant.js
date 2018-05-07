import {Model, BaseModel} from './Model';

import Address from './Address';
import Category from './Category';

@Model
export default class Restaurant extends BaseModel {
    static relationships = ['address']

    constructor(takeaway, data) {
        super(takeaway, data);

        this.address = new Address(takeaway, data.address);
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

            console.log(this.data.menu);

            this.categories = this.data.menu[0].categories.categories.map((category) => new Category(this.takeaway, category));
            console.log(this.categories[0]);
        } catch (err) {
            throw err;
        }
    }
};
