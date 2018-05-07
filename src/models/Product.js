import {Model, BaseModel} from './Model';
import Option from './Option';

@Model
export default class Product extends BaseModel {
    static relationships = []

    constructor(takeaway, data) {
        super(takeaway, data);

        if (data.options) {
            this.options = data.options.options.map((choice) => new Option(takeaway, choice));
            delete data.options;
        }
    }
};
