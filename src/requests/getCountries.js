import {descriptions} from './base';

export default {
    parameters: () => [
        'getcountriesdata'
    ],
    response: {
        config: {
            _self: 'av',
            countries: [{
                _self: 'cd',
                id: 'cy',
                name: 'nm',
                siteUrl: 'su',
                pregMatch1: '/p1',
                pregMatch2: '/p2',
                pregMatch3: '/p3',
                message1: 'e1',
                message2: 'e2',
                twitter: 'tw',
                email: 'se',
                logoUrl: 'lo',
                iconUrl: 'fl',
                headerUrl: 'hl',
                code: 'ic',
                siteCode: 'sc',
                pickupEnabled: '!pie',
                loyaltyShopEnabled: '!lye',
                languages: {
                    _self: 'ls',
                    languages: ['la']
                },
                descriptions: descriptions('cn'),
                movies: descriptions('mv'),
                autoComplete: {
                    _self: 'ac',
                    gp: {
                        _self: 'gp',
                        id: 'sid',
                        apiKey: 'ak',
                        poweredBy: 'pb'
                    },
                    nm: {
                        _self: 'nm',
                        id: 'sid',
                        url: 'ul',
                        apiKey: 'ak'
                    },
                    preferred: 'as'
                },
                enabledRecurringPayments: {
                    _self: 'erp',
                    methods: ['pm']
                },
                si: 'si'
            }],
            kitchens: {
                _self: 'cs',
                kitchens: [{
                    _self: 'ct',
                    id: 'ci',
                    descriptions: descriptions('tr'),
                    imageUrl: 'im',
                    subKitchens: {
                        _self: 'sc',
                        subKitchens: [{
                            _self: 'st',
                            id: 'si',
                            descriptions: descriptions('tr')
                        }]
                    }
                }]
            },
            em: 'em',
            api: {
                _self: 'api',
                rd: 'rd',
                rdc: 'rdc'
            }
        }
    }
};
