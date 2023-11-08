import {type Takeaway} from '../api';

import {BaseModel, type Data, Model} from './Model';
import {Product} from './Product';

@Model
export class Category extends BaseModel {
    static relationships = ['products'];

    id?: string;
    name?: string;
    description?: string;
    imageUrl?: string;
    openingHours?: {
        day?: {
            number?: string;
            time?: {
                start?: Date;
                end?: Date;
            };
        };
    };
    time?: {
        start?: Date;
        end?: Date;
    };
    products: Product[];

    constructor(takeaway: Takeaway, data: Data) {
        super(takeaway, data);

        this.products = data.products.products.map((product) => new Product(takeaway, product));
        delete data.products;
    }
}
