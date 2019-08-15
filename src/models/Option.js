import {Model, BaseModel} from './Model';
import Choice from './Choice';

@Model
class Option extends BaseModel {
    static relationships = ['choices']

    constructor(takeaway, data) {
        super(takeaway, data);

        if (data.choices) {
            this.choices = data.choices.choices.map((choice) => new Choice(takeaway, choice));
            delete data.choices;
        }
    }
}

export default Option;
