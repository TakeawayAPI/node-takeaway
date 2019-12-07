import {Takeaway} from '../api';

import {Model, BaseModel} from './Model';
import {Option} from './Option';
import {ProductSize} from './ProductSize';

@Model
export class Product extends BaseModel {
    static relationships = ['options', 'sizes'];

    options: Option[];
    sizes: ProductSize[];
    sizeIds: string[];
    choiceIds: string[];

    constructor(takeaway: Takeaway, data) {
        super(takeaway, data);

        if (data.options && data.options.options) {
            this.options = data.options.options.map((choice) => new Option(takeaway, choice));
            delete data.options;

            this.choiceIds = this.options.reduce((prev, option) => prev.concat(option.choices.map((choice) => choice.id)), []);
        } else {
            this.options = [];
            this.choiceIds = [];
        }

        if (data.sizes && data.sizes.products) {
            // NOTE: product sizes are exactly the same as products, but due to a weird bug the model proxy woudln't work when recursively creating the product
            this.sizes = data.sizes.products.map((size) => new ProductSize(takeaway, size));
            this.sizeIds = this.sizes.map((size) => size.id).concat([data.id]);
            delete data.sizes;
        } else {
            this.sizes = [];
        }
    }

    toOrderFormat(sizeId = null, choiceIds = []) {
        // Validate size ID
        if (!sizeId) {
            sizeId = this.data.id;
        } else if (!this.sizeIds.includes(sizeId)) {
            throw new Error(`Unknown product size ID "${sizeId}"`);
        }

        // Validate choice IDs
        for (const choiceId of choiceIds) {
            if (!this.choiceIds.includes(choiceId)) {
                throw new Error(`Unknown choice ID "${choiceId}"`);
            }
        }

        // Format product as order
        if (choiceIds.length > 0) {
            return `${sizeId},${choiceIds.join(',')};`;
        }
        return `${sizeId};`;
    }
}

export default Product;
