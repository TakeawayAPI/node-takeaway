import {Model, BaseModel} from './Model';

@Model
export default class Loyalty extends BaseModel {
    static relationships = []

    constructor(takeaway, data) {
        super(takeaway, data);
    }
};
