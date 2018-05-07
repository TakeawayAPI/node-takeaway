import {inspect} from 'util';

import {Takeaway} from '../src';

(async () => {
    try {
        const takeaway = new Takeaway();

        const country = await takeaway.getCountryById('NL');
        const restaurants = await country.getRestaurants('7523', '', '');

        console.log(restaurants[0]);
        const menu = await restaurants[0].getMenu();
        console.log(inspect(menu, false, null));

        // const data = await client.getConfig();

        // const data = await client.getRestaurants({
        //     postalCode: '7523',
        //     country: '1',
        //     latitude: '52.0000000',
        //     longitude: '6.0000000',
        //     language: 'nl'
        // });

        // const restaurants = data.restaurants.restaurants.map((data) => new Restaurant(data));
        // console.log(restaurants[0]);

        // const data = await client.getMenuCard({
        //     restaurantId: '1N01N',
        //     postalCode: '7523',
        //     latitude: '52.0000000',
        //     longitude: '6.0000000'
        // });

        // const data = await client.getDiscounts({
        //     restaurantId: '1N01N',
        //     country: '1',
        //     language: 'nl'
        // }, {
        //     debug: true
        // });

        // delete data.restaurants.restaurants;

        // console.log(inspect(data, false, null));
    } catch (err) {
        console.error(err);
    }
})();
