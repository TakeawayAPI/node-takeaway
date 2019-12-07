import {Takeaway} from '../api';

import {Model, BaseModel} from './Model';
import {Option} from './Option';

@Model
export class ProductSize extends BaseModel {
    static relationships = ['options'];

    options: Option[];

    constructor(takeaway: Takeaway, data) {
        super(takeaway, data);

        if (data.options && data.options.options) {
            this.options = data.options.options.map((choice) => new Option(takeaway, choice));
            delete data.options;
        } else {
            this.options = [];
        }
    }
}
