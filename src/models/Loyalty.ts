import {type Takeaway} from '../api';

import {BaseModel, type Data, Model} from './Model';

@Model
export class Loyalty extends BaseModel {
    static relationships = [];

    unavailable?: boolean;
    points?: string;
    url?: string;
    externalBrowser?: boolean;

    constructor(takeaway: Takeaway, data: Data) {
        super(takeaway, data);
    }
}
