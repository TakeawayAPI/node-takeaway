export default {
    parameters: ({restaurantId}) => ['getidealmobielbanks', restaurantId],
    response: {
        banks: {
            _self: 'bs',
            banks: [
                {
                    _self: 'bk',
                    id: 'ii',
                    name: 'in',
                    mobileWebsite: 'mw'
                }
            ]
        }
    }
};
