import {Model, BaseModel} from './Model';
import Choice from './Choice';

export const OPTION_TYPES = {
    1: 'SINGLE',
    2: 'MULTIPLE'
};

@Model
class Option extends BaseModel {
    static relationships = ['choices']

    constructor(takeaway, data) {
        super(takeaway, data);

        this.type = OPTION_TYPES[data.type];

        if (data.choices) {
            this.choices = data.choices.choices.map((choice) => new Choice(takeaway, choice));
            delete data.choices;
        }
    }
}

export default Option;
