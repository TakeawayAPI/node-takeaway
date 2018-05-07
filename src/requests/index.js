import getAddresses from './getAddresses';
import getBanks from './getBanks';
import getConfig from './getConfig';
import getDiscounts from './getDiscounts';
import getGeoLocation from './getGeoLocation';
import getHistory from './getHistory';
import getHistoryDetails from './getHistoryDetails';
import getLoyaltyPoints from './getLoyaltyPoints';
import getMenuCard from './getMenuCard';
import getRestaurantData from './getRestaurantData';
import getRestaurants from './getRestaurants';
import getReviews from './getReviews';
import getServerTime from './getServerTime';
import getURLs from './getURLs';
import login from './login';
import resetPassword from './resetPassword';

import {reverse} from './util';

const requests = {
    getAddresses,
    getBanks,
    getConfig,
    getDiscounts,
    getGeoLocation,
    getHistory,
    getHistoryDetails,
    getLoyaltyPoints,
    getMenuCard,
    getRestaurantData,
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
