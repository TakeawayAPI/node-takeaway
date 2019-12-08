import {Takeaway} from '../api';

import {Model, BaseModel} from './Model';
import {FoodInformation} from './Product';
import {Option} from './Option';

@Model
export class ProductSize extends BaseModel {
    static relationships = ['options'];

    id?: string;
    description?: string;
    photoUrl?: string;
    deliveryMethod?: string;
    deliveryPrice?: number;
    pickupPrice?: number;
    excludedFromMinimum?: boolean;
    information?: FoodInformation;
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
