export default {
    parameters: ({username, credentials, countryCode, siteCode, page = 1, isLoggedIn = true}) => [
        'getorderhistory',
        username,
        credentials,
        countryCode,
        page,
        siteCode,
        isLoggedIn ? '0' : '1'
    ],
    response: {
        history: {
            _self: 'hi',
            orders: [{
                _self: 'or',
                timestamp: 'ot',
                id: 'id',
                addressId: 'ai',
                steet: 'ad',
                number: 'hn',
                postalCode: 'da',
                deliveryAreaId: 'bg',
                deliveryArea: 'bn',
                city: 'tn',
                restaurantId: 'rd',
                restaurantName: 'nm',
                restaurantLogoUrl: 'lu',
                orderNumber: 'on',
                deliveryMethod: 'dm',
                vietnamCity: 'vc',
                vietnamDistrict: 'vd',
                vietnamDistrictId: 'va',
                latitude: 'lat',
                longitude: 'lng'
            }]
        }
    }
};
