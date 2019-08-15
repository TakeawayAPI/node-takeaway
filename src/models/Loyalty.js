import {Model, BaseModel} from './Model';

@Model
class Loyalty extends BaseModel {
    static relationships = []

    constructor(takeaway, data) {
        super(takeaway, data);
    }
}

export default Loyalty;
