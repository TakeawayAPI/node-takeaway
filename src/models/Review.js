import {Model, BaseModel} from './Model';

@Model
class Review extends BaseModel {
    static relationships = []

    constructor(takeaway, data) {
        super(takeaway, data);
    }
}

export default Review;
