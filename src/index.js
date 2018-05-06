import 'babel-polyfill';

import {inspect} from 'util';

import TakeawayConfig from './config';
import TakeawayClient from './client';

export {
    TakeawayConfig,
    TakeawayClient
};

(async () => {
    try {
        const config = new TakeawayConfig();
        const client = new TakeawayClient(config);

        // const data = await client.getRestaurants({
        //     postalCode: '7523',
        //     country: '1',
        //     latitude: '52.0000000',
        //     longitude: '6.0000000',
        //     language: 'nl'
        // });

        // const data = await client.getMenuCard({
        //     restaurantId: '1N01N',
        //     postalCode: '7523',
        //     latitude: '52.0000000',
        //     longitude: '6.0000000'
        // });

        // const data = await client.getConfig();
        const data = await client.getReviews({
            restaurantId: '1N01N'
        }, {
            debug: true
        });

        console.log(inspect(data, false, null));
    } catch (err) {
        console.error(err);
    }
})();
