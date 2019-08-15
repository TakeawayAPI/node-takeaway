import {Model, BaseModel} from './Model';

@Model
class HistoryProduct extends BaseModel {
    static relationships = []

    constructor(takeaway, data) {
        super(takeaway, data);
    }
}

export default HistoryProduct;
