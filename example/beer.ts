import {Takeaway} from '../src';

(async () => {
    try {
        const takeaway = new Takeaway();
        const postalCode = '7523';

        const country = await takeaway.getCountryById('NL');
        const restaurants = await country.getRestaurants(postalCode, '', '');

        for (const restaurant of restaurants) {
            console.log(restaurant.data.name);
            console.group();
            await restaurant.getMenu(postalCode);

            if (restaurant.categories) {
                for (const category of restaurant.categories) {
                    for (const product of category.products) {
                        if (product.name && product.name.toLowerCase().includes('grolsch')) {
                            console.log(product.name, (product.deliveryPrice ?? 0) / 100);
                        }
                    }
                }
            }

            console.groupEnd();
        }
    } catch (err) {
        console.error(err);
    }
})();
