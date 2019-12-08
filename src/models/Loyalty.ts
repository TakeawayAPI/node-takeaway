import {Takeaway} from '../api';

import {Model, BaseModel, Data} from './Model';

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
