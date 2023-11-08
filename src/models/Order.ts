import {type Takeaway} from '../api';

import {BaseModel, type Data, Model} from './Model';

@Model
export class Order extends BaseModel {
    static relationships = [];

    constructor(takeaway: Takeaway, data: Data) {
        super(takeaway, data);
    }
}
