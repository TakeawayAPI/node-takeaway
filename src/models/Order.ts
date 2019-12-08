import {Takeaway} from '../api';

import {Model, BaseModel, Data} from './Model';

@Model
export class Order extends BaseModel {
    static relationships = [];

    constructor(takeaway: Takeaway, data: Data) {
        super(takeaway, data);
    }
}
