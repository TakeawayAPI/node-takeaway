import {Model, BaseModel} from './Model';
import Choice from './Choice';

@Model
export default class Option extends BaseModel {
    static relationships = []

    constructor(takeaway, data) {
        super(takeaway, data);

        if (data.choices) {
            this.choices = data.choices.choices.map((choice) => new Choice(takeaway, choice));
            delete data.choices;
        }
    }
};
