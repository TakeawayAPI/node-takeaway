import {Model, BaseModel} from './Model';

@Model
class Bank extends BaseModel {
    static relationships = []

    constructor(takeaway, data) {
        super(takeaway, data);
    }
}

export default Bank;
