import {inspect} from 'util';

import {Takeaway, TakeawayConfig} from '../src';

const DEBUG = false;

const print = (obj: any) => {
    if (DEBUG) {
        console.log(inspect(obj, false, null));
    }
};

const inputs = [{
    language: 'nl',
    url: 'https://nl.citymeal.com/android/android.php',
    postalCode: '7522'
}, {
    language: 'de',
    url: 'https://de.citymeal.com/android/android.php',
    postalCode: '44369'
}];

(async () => {
    try {
        // Choose input
        const input = inputs[0];

        // Initialize API
        const takeaway = new Takeaway(new TakeawayConfig({
            language: input.language,
            url: input.url
        }));

        // Get country
        const country = await takeaway.getCountryById(input.language.toUpperCase());
        print(country.data);

        // Get restaurants for the postal code
        const restaurants = await country.getRestaurants(input.postalCode, '', '');

        // Loop over all restaurants
        for (const restaurant of restaurants) {
            print(restaurant);

            const name = restaurant.data.name;
            const address = `${restaurant.address.data.street}, ${restaurant.address.data.city}`;

            console.log(`${name} - ${address} - ${restaurant.data.open ? 'OPEN' : 'CLOSED'}`);
        }
    } catch (err) {
        console.error(err);
    }
})();
