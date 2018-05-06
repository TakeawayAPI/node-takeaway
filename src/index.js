import 'babel-polyfill';

import {inspect} from 'util';

import {request} from './request';
import {getMenuCard} from './requests';

(async () => {
    // console.log(inspect(getRestaurants.response, false, null));

    try {
        // const data = await request(getRestaurants, {
        //     postalCode: '7523CK',
        //     country: '1',
        //     latitude: '52.2345951',
        //     longitude: '6.8979074',
        //     language: 'nl'
        // });

        const data = await request(getMenuCard, {
            restaurantId: '1N01N',
            postalCode: '7523CK',
            latitude: '52.2345951',
            longitude: '6.8979074'
        });


        console.log(inspect(data, false, null));
    } catch (err) {
        console.error(err);
    }
})();
