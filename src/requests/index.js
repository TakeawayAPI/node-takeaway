import getServerTime from './getServerTime';
import getConfig from './getConfig';
import getRestaurants from './getRestaurants';
import getGeoLocation from './getGeoLocation';
import getMenuCard from './getMenuCard';
import getReviews from './getReviews';
import getBanks from './getBanks';
import getURLs from './getURLs';

import {reverse} from './util';

const requests = {
    getServerTime,
    getConfig,
    getRestaurants,
    getMenuCard,
    getGeoLocation,
    getReviews,
    getBanks,
    getURLs
};

// Reverse all request definition objects for the parser
for (const request of Object.values(requests)) {
    request.response = reverse(request.response);
}

export default requests;
