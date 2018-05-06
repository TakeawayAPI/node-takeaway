import {reverse} from './util';

export default {
    parameters: ({postalCode, country, latitude, longitude, language}) => [
        'getrestaurants',
        postalCode,
        country,
        latitude,
        longitude,
        language,
        '0',
        '1'
    ],
    response: reverse({
        rs: {
            _self: 'rs',
            location: {
                _self: 'cp',
                street: 'ps',
                city: 'pt',
                postalCode: 'ptd',
                vietnamDistrict: 'vd',
                vietnamCity: 'vc',
                vietnamDistrictId: 'vi',
                vietnamCityId: 'va'
            },
            restaurants: [{
                _self: 'rt',
                id: 'id',
                name: 'nm',
                tip: 'tip',
                new: 'ne',
                branch: 'bn',
                // TODO: payment methods (pm)
                estimatedDeliveryTime: 'est'
            }]
        }
    })
};
