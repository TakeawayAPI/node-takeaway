import {Takeaway} from '../api';

import {Model, BaseModel, Data} from './Model';
import {Choice} from './Choice';

export enum OptionType {
    SINGLE = 'SINGLE',
    MULTIPLE = 'MULTIPLE'
}

const OPTION_TYPES = {
    1: OptionType.SINGLE,
    2: OptionType.MULTIPLE
};

@Model
export class Option extends BaseModel {
    static relationships = ['choices'];

    name?: string;
    type?: string;
    optionType?: OptionType;
    choices: Choice[];

    constructor(takeaway: Takeaway, data: Data) {
        super(takeaway, data);

        if (data.type) {
            this.optionType = OPTION_TYPES[data.type];
        }

        if (data.choices) {
            this.choices = data.choices.choices.map((choice) => new Choice(takeaway, choice));
            delete data.choices;
        } else {
            this.choices = [];
        }
    }
}
