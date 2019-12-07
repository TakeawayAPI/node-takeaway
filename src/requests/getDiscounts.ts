export default {
    parameters: ({restaurantId, country, language}) => [
        'getdiscounts',
        restaurantId,
        country,
        language,
        'restid'
    ],
    response: {
        discounts: {
            _self: 'dc',
            restaurant: {
                _self: 'rc',
                id: 'ri',
                discounts: [{
                    _self: 'dr',
                    id: 'di',
                    name: 'dt',
                    description: 'dd',
                    deliveryMode: 'ddm'
                }]
            }
        }
    }
};
