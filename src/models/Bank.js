import {Model, BaseModel} from './Model';

@Model
export default class Bank extends BaseModel {
    static relationships = []

    constructor(takeaway, data) {
        super(takeaway, data);
    }
};
