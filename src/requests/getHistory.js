export default {
    parameters: ({username, credentials, countryCode, orderId, siteCode, isLoggedIn = true}) => [
        'getorderdetails',
        username,
        credentials,
        countryCode,
        orderId,
        siteCode,
        isLoggedIn ? '0' : '1'
    ],
    response: {
        orders: {
            _self: 'od',
            totalPrice: '$tt',
            deliveryCosts: '$dc',
            paymentMethod: 'pm',
            discountReceived: '!ds',
            products: [{
                _self: 'pr',
                id: 'id',
                name: 'nm',
                price: '$pc',
                rmk: 'rmk',
                options: [{
                    _self: 'sd',
                    id: 'id',
                    name: 'nm',
                    price: '$pc'
                }]
            }],
            transactionCosts: '$mf',
            polygonStatus: 'ply'
        }
    }
};
