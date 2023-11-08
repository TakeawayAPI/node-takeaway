import type {Takeaway} from '../api';

import {BaseModel, type Data, Model} from './Model';

@Model
export class Review extends BaseModel {
    static relationships = [];

    name?: string;
    time?: string;
    description?: string;
    quality?: number;
    delivery?: string;
    sunday?: boolean;
    orderMethod?: string;

    constructor(takeaway: Takeaway, data: Data) {
        super(takeaway, data);
    }
}
