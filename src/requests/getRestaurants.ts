import {deliveryMethods, deliveryCosts} from './base';

export default {
    parameters: ({postalCode, country, latitude, longitude, language, isLocationAccurate = '1'}) => [
        'getrestaurants',
        postalCode,
        country,
        latitude,
        longitude,
        language,
        '0',
        isLocationAccurate
    ],
    response: {
        restaurants: {
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
                tip: '!tip',
                new: '!new',
                branch: 'bn',
                open: '!op',
                payment: {
                    _self: 'pm',
                    methods: [{
                        _self: 'me',
                        id: 'mi'
                    }]
                },
                estimatedDeliveryTime: 'est',
                deliveryMethods: deliveryMethods('dm'),
                polygonStatus: 'ply',
                kitchens: {
                    _self: 'cs',
                    ids: ['ct']
                },
                subKitchens: {
                    _self: 'sc',
                    ids: ['si']
                },
                popularDishes: {
                    _self: 'pd',
                    ids: ['pz']
                },
                sorting: {
                    _self: 'sr',
                    s1: 's1',
                    s2: 's2',
                    s3: 's3',
                    s4: 's4',
                    s5: 's5',
                    s6: 's6',
                    s7: 's7',
                    s8: 's8',
                    s9: 's9'
                },
                information: 'nt',
                grade: '#rv',
                address: {
                    _self: 'ad',
                    street: 'st',
                    city: 'ci',
                    latitude: 'lt',
                    longitude: 'ln',
                    vietnamDistrict: 'pp'
                },
                ratingCount: '#bd',
                logoUrl: 'lo',
                cacheKey: 'ck',
                deliveryCosts: deliveryCosts('dc'),
                hasDiscounts: '!hd',
                hasFoodTracker: '!ft',
                distance: '.ds'
            }],
            weekday: 'wd',
            currentTime: '*ct'
        },
    }
};
