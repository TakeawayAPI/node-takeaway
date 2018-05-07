export default {
    parameters: ({restaurantId, page = 1}) => [
        'restaurantreviews',
        restaurantId,
        page
    ],
    response: {
        reviews: {
            _self: 'rr',
            reviews: [{
                _self: 'rv',
                name: 'nm',
                time: 'ti',
                description: 'rm',
                quality: '#kw',
                delivery: 'be',
                sunday: '!zo',
                orderMethod: 'dm'
            }]
        }
    }
};
