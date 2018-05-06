import {deliveryMethods, deliveryCosts} from './base';

const time = (tag) => ({
    _self: tag,
    currentTime: 'ct',
    td: {
        _self: 'td',
        time: {
            _self: 'ti',
            start: 'st',
            end: 'et'
        }
    },
    tm: {
        _self: 'tm',
        time: {
            _self: 'ti',
            start: 'st',
            end: 'et'
        }
    }
});

const foodInformation = (tag) => ({
    _self: tag,
    allergens: {
        _self: 'all',
        ids: ['id']
    },
    additives: {
        _self: 'add',
        ids: ['id']
    },
    nutritionFacts: 'nut',
    extra: {
        _self: 'xtr',
        caffeine: 'caf',
        alcoholPerVolume: 'abv',
        bottleDeposit: 'dep',
        volumePerLitre: 'ltr',
        costPerLitreDelivery: 'ltr',
        costPerLitrePickup: 'clp',
        volumePerKilogram: 'kgm',
        costPerGramDelivery: 'cgd',
        costPerGramPickup: 'cgp'
    }
});

export const discount = (tag) => ({
    _self: tag,
    type: 'tp',
    name: 'nm',
    description: 'ds',
    price: 'pr',
    amount: 'da',
    percentage: 'dp',
    productNumber: 'dn',
    productGroups: {
        _self: 'kg',
        items: [{
            _self: 'ki',
            ids: ['id']
        }]
    },
    repeat: 'en',
    calculateSideDishes: 'is',
    minimumAmount: 'doo',
    deliveryMode: 'ddm',
    wd: 'wd',
    do: 'do'
});

export default {
    parameters: ({restaurantId, postalCode, latitude, longitude, clientId = '', isLocationAccurate = '1'}) => [
        'getrestaurantdata',
        restaurantId,
        postalCode,
        '1',
        latitude,
        longitude,
        clientId,
        isLocationAccurate
    ],
    response: {
        restaurant: {
            _self: 'rd',
            id: 'ri',
            name: 'nm',
            branch: 'bn',
            open: 'op',
            polygonStatus: 'ply',
            cacheKey: 'ck',
            distance: 'ds',
            address: {
                _self: 'ad',
                street: 'st',
                number: 'hn',
                postalCode: 'pc',
                city: 'tn',
                latitude: 'lt',
                longitude: 'ln'
            },
            legal: {
                _self: 'lgl',
                owner: 'own',
                commericalRegister: 'tcr',
                vat: 'vat',
                address: {
                    _self: 'adr',
                    street: 'st',
                    number: 'hn',
                    postalCode: 'pc',
                    city: 'tn'
                },
                crn: 'crn'
            },
            information: {
                _self: 'oo',
                logoUrl: 'lu',
                information: 'nt',
                slogan: 'sl',
                grade: 'rv',
                ratingCount: 'bd',
                hasFoodTracker: 'ft',
                cim: 'cim'
            },
            deliveryMethods: deliveryMethods('dm'),
            deliveryCosts: deliveryCosts('dc'),
            payment: {
                _self: 'pm',
                methods: [{
                    _self: 'me',
                    id: 'mi',
                    fixedCosts: 'mt',
                    percentageCosts: 'mf'
                }]
            },
            deliveryTime: time('dt'),
            pickupTime: time('pt'),
            deliveryDistricts: {
                _self: 'dd',
                areas: [{
                    ...deliveryCosts('da'),
                    postalCode: {
                        _self: 'pc',
                        codes: ['pp']
                    }
                }]
            },
            popularDishes: {
                _self: 'pd',
                ids: ['pz']
            },
            menu: [{
                _self: 'mc',
                categories: {
                    _self: 'cs',
                    categories: [{
                        _self: 'ct',
                        id: 'id',
                        name: 'nm',
                        description: 'ds',
                        imageUrl: 'cti',
                        ot: {
                            _self: 'ot'
                            // TODO
                        },
                        products: {
                            _self: 'ps',
                            products: [{
                                _self: 'pr',
                                id: 'id',
                                name: 'nm',
                                description: 'ds',
                                photoUrl: 'pu',
                                deliveryMethod: 'ah',
                                deliveryPrice: 'pc',
                                pickupPrice: 'tc',
                                information: foodInformation('fai'),
                                excludedFromMinimum: 'xfm',
                                options: {
                                    _self: 'ss',
                                    options: [{
                                        _self: 'sd',
                                        name: 'nm',
                                        type: 'tp',
                                        choices: {
                                            _self: 'cc',
                                            choices: [{
                                                _self: 'ch',
                                                id: 'id',
                                                name: 'nm',
                                                deliveryPrice: 'pc',
                                                pickupPrice: 'tc',
                                                excludedFromMinimum: 'xfm',
                                                information: foodInformation('fai')
                                            }]
                                        }
                                    }]
                                }
                            }]
                        },
                        time: {
                            _self: 'ru',
                            start: 'st',
                            end: 'en'
                        }
                    }],
                    discounts1: {
                        _self: 'ks',
                        discounts: [discount('kk')]
                    },
                    discounts2: {
                        _self: 'ak',
                        discounts: [discount('kk')]
                    }
                }
            }],
            // TODO: ap
            currentTime: 'ct',
            weekday: 'wd',
            clearEmail: 'ce'
        }
    }
};
