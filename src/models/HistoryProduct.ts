import {type Takeaway} from '../api';

import {BaseModel, type Data, Model} from './Model';

@Model
export class HistoryProduct extends BaseModel {
    static relationships = [];

    id?: string;
    name?: string;
    price?: number;
    rmk?: string;
    options?: {
        id?: string;
        name?: string;
        price?: number;
    };

    constructor(takeaway: Takeaway, data: Data) {
        super(takeaway, data);
    }
}
