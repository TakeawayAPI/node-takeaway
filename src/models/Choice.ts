import {type Takeaway} from '../api';

import {BaseModel, type Data, Model} from './Model';
import {type FoodInformation} from './Product';

@Model
export class Choice extends BaseModel {
    static relationships = [];

    id?: string;
    name?: string;
    deliveryPrice?: number;
    pickupPrice?: number;
    excludedFromMinimum?: boolean;
    information?: FoodInformation;

    constructor(takeaway: Takeaway, data: Data) {
        super(takeaway, data);
    }
}
