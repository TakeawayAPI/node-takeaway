import {Takeaway} from '../api';

import {Model, BaseModel, Data} from './Model';

@Model
export class Address extends BaseModel {
    static relationships = [];

    id?: string;
    street?: string;
    number?: string;
    postalCode?: string;
    city?: string;
    phone?: string;
    latitude?: string;
    longitude?: string;
    deliveryAreaId?: string;
    deliveryArea?: string;
    vietnamCity?: string;
    vietnamArea?: string;
    vietnamCityId?: string;
    vietnamDistrict?: string;
    vietnamDistrictId?: string;
    extra?: {
        flatNumber?: string;
        house?: string;
        entrance?: string;
        stock?: string;
        door?: string;
        accessCode?: string;
        intercom?: string;
        floor?: string;
        residence?: string;
        apartment?: string;
        building?: string;
        hotel?: string;
        compound?: string;
        room?: string;
        compoundAddresss?: string;
        ward?: string;
        company?: string;
    };

    constructor(takeaway: Takeaway, data: Data) {
        super(takeaway, data);
    }
}
