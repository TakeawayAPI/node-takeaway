import {deliveryMethods, deliveryCosts} from './base';

const time = (tag: string) => ({
    _self: tag,
    currentTime: '*ct',
    td: {
        _self: 'td',
        time: {
            _self: 'ti',
            start: '*st',
            end: '*et'
        }
    },
    tm: {
        _self: 'tm',
        time: {
            _self: 'ti',
            start: '*st',
            end: '*et'
        }
    }
});

export const restaurant = (tag: string) => ({
    _self: tag,
    id: 'ri',
    name: 'nm',
    branch: 'bn',
    open: '!op',
    polygonStatus: 'ply',
    cacheKey: 'ck',
    distance: '.ds',
    address: {
        _self: 'ad',
        street: 'st',
        number: 'hn',
        postalCode: 'pc',
        city: 'tn',
        latitude: 'lt',
        longitude: 'ln'
    },
    telephone: {
      _self: 'tel',
      number: 'no1'
    },
    legal: {
        _self: 'lgl',
        owner: 'own',
        commericalRegister: 'tcr',
        chamberOfCommerce: 'crn',
        vat: 'vat',
        address: {
            _self: 'adr',
            street: 'st',
            number: 'hn',
            postalCode: 'pc',
            city: 'tn'
        }
    },
    information: {
        _self: 'oo',
        logoUrl: 'lu',
        information: 'nt',
        slogan: 'sl',
        grade: '#rv',
        ratingCount: '#bd',
        hasFoodTracker: '!ft',
        cloudinaryLogo: 'cloudinaryLogo',
        // Unknown attributes
        cim: 'cim',
        rvd: 'rvd',
        eba: 'eba'
    },
    deliveryMethods: deliveryMethods('dm'),
    deliveryCosts: deliveryCosts('dc'),
    payment: {
        _self: 'pm',
        methods: [{
            _self: 'me',
            id: 'mi',
            fixedCosts: '$mt',
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
    headerImageUrl: 'mh',
    slug: 'murl',
    cloudinaryHeader: 'cloudinaryHeader',
    // Unknown attributes
    ac: 'ac',
    ddf: 'ddf',
    pne: 'pne',
    pty: 'pty',
    pro: 'pro',
    rci: 'rci',
    rte: 'rte',
    rt: {
        _self: 'rt',
        cr: 'cr',
        prr: 'prr'
    },
    sco: 'sco',
    smid: 'smid',
    tr: 'tr',
});
