export const descriptions = (tag) => ({
    _self: tag,
    bg: 'bg',
    da: 'da',
    de: 'de',
    en: 'en',
    fr: 'fr',
    it: 'it',
    lu: 'lu',
    nl: 'nl',
    no: 'no',
    pl: 'pl',
    pt: 'pt',
    ro: 'ro',
    sv: 'sv',
    vi: 'vi'
});

export const deliveryMethods = (tag) => ({
    _self: tag,
    orderMethods: 'ah',
    delivery: {
        _self: 'dl',
        open: '!op',
        orderAhead: '!oh',
        mealPrepTime: '#mpt',
        eta: {
            _self: 'eta',
            min: '#min',
            max: '#max'
        }
    },
    pickup: {
        _self: 'pu',
        open: '!op',
        orderAhead: '!oh',
        mealPrepTime: '#mpt'
    }
});

export const deliveryCosts = (tag) => ({
    _self: tag,
    minimumAmount: '$ma',
    costs: {
        _self: 'co',
        from: '#fr',
        to: '#to',
        costs: '$ct'
    },
    // Unknown attributes
    ddf: 'ddf'
});

export const contacts = (tag) => ({
    _self: tag,
    firstName: 'fn',
    lastName: 'ln',
    addresses: [{
        _self: 'ad',
        id: 'id',
        street: 'st',
        number: 'hn',
        postalCode: 'pc',
        city: 'tn',
        phone: 'nr',
        deliveryAreaId: 'bg',
        deliveryArea: 'bn',
        vietnamCity: 'vc',
        vietnamArea: 'va',
        vietnamCityId: 'va',
        vietnamDistrict: 'vd',
        vietnamDistrictId: 'vi',
        extra: {
            _self: 'ei',
            flatNumber: 'flatnumber',
            house: 'housename',
            entrance: 'entrance',
            stock: 'stock',
            door: 'door',
            accessCode: 'accesscode',
            intercom: 'intercom',
            floor: 'floor',
            residence: 'residencetype',
            apartment: 'apartmentname',
            building: 'buildingname',
            hotel: 'hotelname',
            compound: 'compoundname',
            room: 'roomnumber',
            compoundAddresss: 'addressatcompound',
            ward: 'ward',
            company: 'companyname'
        }
    }]
});
