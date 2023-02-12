import {restaurant} from './restaurant';

export const product = (tag: string, sizes = true) => ({
    _self: tag,
    id: 'id',
    name: 'nm',
    description: 'ds',
    photoUrl: 'pu',
    deliveryMethod: 'ah',
    deliveryPrice: '$pc',
    pickupPrice: '$tc',
    information: foodInformation('fai'),
    excludedFromMinimum: '!xfm',
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
                    deliveryPrice: '$pc',
                    pickupPrice: '$tc',
                    excludedFromMinimum: '!xfm',
                    information: foodInformation('fai')
                }]
            }
        }]
    },
    sizes: sizes ? {
        _self: 'sz',
        products: [product('pr', false)]
    } : {
        _self: 'sz'
    },
    cloudinaryProduct: 'cloudinaryProduct',
    // NOTE: this field is not used in the Android app, so no clue what it is
    ea: '$ea'
});

const foodInformation = (tag: string) => ({
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
        costPerGramPickup: 'cgp',
        costPerLiterDelivery: 'cld'
    }
});

export const discount = (tag: string) => ({
    _self: tag,
    type: 'tp',
    name: 'nm',
    description: 'ds',
    price: '$pr',
    amount: '#da',
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
    calculateSideDishes: '!is',
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
            ...restaurant('rd'),
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
                        openingHours: {
                            _self: 'ao',
                            day: {
                                _self: 'dr',
                                number: 'od',
                                time: {
                                    _self: 'ru',
                                    start: '*st',
                                    end: '*en'
                                }
                            }
                        },
                        products: {
                            _self: 'ps',
                            products: [product('pr')]
                        },
                        time: {
                            _self: 'ru',
                            start: '*st',
                            end: '*en'
                        },
                        cloudinaryChain: 'cloudinaryChain',
                        ctoi: 'ctoi'
                    }],
                    discounts1: {
                        _self: 'ks',
                        discounts: [discount('kk')]
                    },
                    discounts2: {
                        _self: 'ak',
                        discounts: [discount('kk')]
                    }
                },
                plasticBag: {
                    _self: 'ap',
                    products: [product('pr')]
                }
            }],
            // TODO: ap
            currentTime: '*ct',
            weekday: 'wd',
            clearEmail: 'ce'
        }
    }
};
