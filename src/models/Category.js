import {Model, BaseModel} from './Model';

@Model
export default class Category extends BaseModel {
    static relationships = []

    constructor(takeaway, data) {
        super(takeaway, data);
    }
};
