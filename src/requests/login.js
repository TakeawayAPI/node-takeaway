export default {
    parameters: ({username, credentials, country, clientId = '', siteCode, socialType = '', socialToken = ''}) => [
        'userauth',
        username,
        credentials,
        country,
        clientId,
        siteCode,
        socialType && socialType.length > 0 ? '1' : '0',
        socialType,
        socialToken
    ],
    response: {
        login: {
            _self: 'ua',
            id: 'id',
            token: 'tk',
            firstName: 'fn',
            lastName: 'ln',
            email: 'em',
            oldOrders: 'oo',
            ac: 'ac',
            social: {
                _self: 'sm',
                id: 'sid',
                username: 'un'
            },
            migrated: 'mig',
            contacts: {
                _self: 'cs',
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
                    },
                    bg: 'bg',
                    bn: 'bn'
                }]
            }
        }
    }
};
