import {Takeaway} from '../api';

import {Model, BaseModel} from './Model';
import {Product} from './Product';

@Model
export class Category extends BaseModel {
    static relationships = ['products'];

    products: Product[];

    constructor(takeaway: Takeaway, data) {
        super(takeaway, data);

        this.products = data.products.products.map((product) => new Product(takeaway, product));
        delete data.products;
    }
}
