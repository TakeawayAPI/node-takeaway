import {inspect} from 'util';

import {Takeaway} from '../src';

(async () => {
    try {
        const takeaway = new Takeaway();

        const country = await takeaway.getCountryById('NL');
        // const restaurants = await country.getRestaurants('7523', '', '');

        const user = await country.login('daniel@huisman.me', 'test');
        const history = await user.getHistory(1);
        await history[0].getDetails();

        console.log(inspect(history[0], false, null));
        console.log(inspect(await user.getLoyalty(), false, null));
    } catch (err) {
        console.error(err);
    }
})();
