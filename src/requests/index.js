import getBanks from './getBanks';
import getConfig from './getConfig';
import getGeoLocation from './getGeoLocation';
import getMenuCard from './getMenuCard';
import getRestaurants from './getRestaurants';
import getReviews from './getReviews';
import getServerTime from './getServerTime';
import getURLs from './getURLs';
import login from './login';
import resetPassword from './resetPassword';

import {reverse} from './util';

const requests = {
    getBanks,
    getConfig,
    getGeoLocation,
    getMenuCard,
    getRestaurants,
    getReviews,
    getServerTime,
    getURLs,
    login,
    resetPassword
};

// Reverse all request definition objects for the parser
for (const request of Object.values(requests)) {
    request.response = reverse(request.response);
}

export default requests;
