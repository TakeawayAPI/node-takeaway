import {Takeaway} from '../api';

import {Model, BaseModel, Data} from './Model';

@Model
export class Bank extends BaseModel {
    static relationships = [];

    id?: string;
    name?: string;
    mobileWebsite?: string;

    constructor(takeaway: Takeaway, data: Data) {
        super(takeaway, data);
    }
}
