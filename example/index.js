import {inspect} from 'util';

import {TakeawayConfig, TakeawayClient} from '../src';

(async () => {
    try {
        const config = new TakeawayConfig();
        const client = new TakeawayClient(config);

        // const data = await client.getConfig();

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

        const data = await client.getAddresses({
            username: 'daniel@huisman.me',
            credentials: 'U7#kS9V@7wB?s9V#',
            countryCode: 1,
            siteCode: 48
        }, {
            debug: true
        });

        // const data = await client.getDiscounts({
        //     restaurantId: '1N01N',
        //     country: '1',
        //     language: 'nl'
        // }, {
        //     debug: true
        // });

        console.log(inspect(data, false, null));
    } catch (err) {
        console.error(err);
    }
})();
