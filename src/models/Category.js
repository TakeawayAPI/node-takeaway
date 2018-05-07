import {Model, BaseModel} from './Model';
import Product from './Product';

@Model
export default class Category extends BaseModel {
    static relationships = []

    constructor(takeaway, data) {
        super(takeaway, data);

        this.products = data.products.products.map((product) => new Product(takeaway, product));
        delete data.products;
    }
};
