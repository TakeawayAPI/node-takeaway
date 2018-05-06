export default {
    parameters: ({latitude, longitude, country}) => [
        'getdatafromgeolocation',
        latitude,
        longitude,
        country
    ],
    response: {
        location: {
            _self: 'ld',
            postalCode: 'pc',
            country: 'cy',
            city: 'tn',
            province: 'pr'
        }
    }
};
