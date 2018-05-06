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
        //     postalCode: '7523CK',
        //     country: '1',
        //     latitude: '52.2345951',
        //     longitude: '6.8979074',
        //     language: 'nl'
        // });

        // const data = await client.getMenuCard({
        //     restaurantId: '1N01N',
        //     postalCode: '7523CK',
        //     latitude: '52.2345951',
        //     longitude: '6.8979074'
        // });

        const data = await client.getConfig();

        console.log(inspect(data, false, null));
    } catch (err) {
        console.error(err);
    }
})();
