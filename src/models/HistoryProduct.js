import {Model, BaseModel} from './Model';

@Model
export default class HistoryProduct extends BaseModel {
    static relationships = []

    constructor(takeaway, data) {
        super(takeaway, data);
    }
};
