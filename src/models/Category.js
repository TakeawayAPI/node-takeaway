import {Model, BaseModel} from './Model';
import Product from './Product';

@Model
class Category extends BaseModel {
    static relationships = ['products']

    constructor(takeaway, data) {
        super(takeaway, data);

        this.products = data.products.products.map((product) => new Product(takeaway, product));
        delete data.products;
    }
}

export default Category;
