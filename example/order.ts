import {Takeaway} from '../src';

(async () => {
    try {
        const takeaway = new Takeaway();
        const postalCode = '7523';

        const country = await takeaway.getCountryById('NL');
        const restaurants = await country.getRestaurants(postalCode, '', '');

        for (const restaurant of restaurants) {
            if (!restaurant.data.name.toLowerCase().includes('domino')) {
                continue;
            }

            await restaurant.getMenu(postalCode);

            if (restaurant.categories) {
                for (const category of restaurant.categories) {
                    for (const product of category.products) {
                        if (product.name) {
                            if (!product.name.toLowerCase().includes('pizza margaritha')) {
                                continue;
                            }
                            if (product.name.toLowerCase().includes('vegan') || product.name.toLowerCase().includes('glutenvrij')) {
                                continue;
                            }

                            console.log(product.data);
                            if (product.options) {
                                console.log('Options:');
                                console.group();
                                for (const option of product.options) {
                                    console.log(option.data);

                                    if (option.choices) {
                                        console.log('Choices:');
                                        console.group();
                                        for (const choice of option.choices) {
                                            console.log(choice.data);
                                        }
                                        console.groupEnd();
                                    }
                                }
                                console.groupEnd();
                            }
                            if (product.sizes) {
                                console.log('Sizes:');
                                console.group();
                                for (const size of product.sizes) {
                                    console.log(size.data.id, size.data.name);
                                }
                                console.groupEnd();
                            }
                            console.log();

                            console.log('Order format:', product.toOrderFormat('N05701O35', ['OO3RO7PNON']));
                        }
                    }
                }
            }
        }
    } catch (err) {
        console.error(err);
    }
})();
