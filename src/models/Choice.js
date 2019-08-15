import {Model, BaseModel} from './Model';

@Model
class Choice extends BaseModel {
    static relationships = []

    constructor(takeaway, data) {
        super(takeaway, data);
    }
}

export default Choice;
