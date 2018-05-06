import 'babel-polyfill';

import {inspect} from 'util';

import {request} from './request';
import {getConfig} from './requests';

(async () => {
    // console.log(inspect(getRestaurants.response, false, null));

    try {
        const data = await request(getConfig);

        // const data = await request(getRestaurants, {
        //     postalCode: '7523CK',
        //     country: '1',
        //     latitude: '52.2345951',
        //     longitude: '6.8979074',
        //     language: 'nl'
        // });

        // console.log(inspect(data.config.countries[0], false, null));
    } catch (err) {
        console.error(err);
    }
})();
