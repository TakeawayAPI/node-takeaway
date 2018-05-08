import {Model, BaseModel} from './Model';

@Model
export default class Review extends BaseModel {
    static relationships = []

    constructor(takeaway, data) {
        super(takeaway, data);
    }
};
