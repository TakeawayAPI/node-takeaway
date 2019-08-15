import {Model, BaseModel} from './Model';
import Option from './Option';

@Model
class Product extends BaseModel {
    static relationships = ['options']

    constructor(takeaway, data) {
        super(takeaway, data);

        if (data.options && data.options.options) {
            this.options = data.options.options.map((choice) => new Option(takeaway, choice));
            delete data.options;
        } else {
            this.options = [];
        }
    }
}

export default Product;
