import {Model, BaseModel} from './Model';

@Model
class Address extends BaseModel {
    static relationships = []

    constructor(takeaway, data) {
        super(takeaway, data);
    }
}

export default Address;
