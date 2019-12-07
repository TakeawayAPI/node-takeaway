import {restaurant} from './restaurant';

export default {
    parameters: ({restaurantId, postalCode, latitude, longitude, clientId, isLocationAccurate = '1'}) => [
        'getrestaurantdatacheckout',
        restaurantId,
        postalCode,
        '1',
        latitude,
        longitude,
        clientId,
        isLocationAccurate
    ],
    response: {
        restaurant: {
            ...restaurant('rd'),

            weekday: 'wd',
            currentTime: '*ct',
            clearEmail: 'ce'
        }
    }
};
