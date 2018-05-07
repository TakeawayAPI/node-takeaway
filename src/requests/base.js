export const descriptions = (tag) => ({
    _self: tag,
    bg: 'bg',
    da: 'da',
    de: 'de',
    en: 'en',
    fr: 'fr',
    lu: 'lu',
    nl: 'nl',
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
        mealPrepTime: '#mpt'
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
        from: '*fr',
        to: '*to',
        costs: '$ct'
    }
});
