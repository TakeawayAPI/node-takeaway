import {Takeaway, OptionType, PaymentMethod, OrderDeliveryMethod} from '../src';

(async () => {
    try {
        const takeaway = new Takeaway();
        const postalCode = process.env.POSTAL_CODE;

        const country = await takeaway.getCountryById('NL');
        const restaurants = await country.getRestaurants(postalCode, '', '');

        for (const restaurant of restaurants) {
            if (!restaurant.name.toLowerCase().includes('domino')) {
                continue;
            }
            if (!restaurant.address.street.toLowerCase().includes('hortensiastraat')) {
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

                            const sizeId = product.id;
                            const choiceIds = [];

                            console.log(product.data);
                            if (product.options) {
                                console.log('Options:');
                                console.group();
                                for (const option of product.options) {
                                    console.log(option.optionType, option.data);

                                    if (option.optionType === OptionType.SINGLE) {
                                        choiceIds.push(option.choices[0].id);
                                    }

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

                            console.log('Order format:', product.toOrderFormat(sizeId, choiceIds));

                            const order = await country.order({
                                name: process.env.NAME,
                                address: {
                                    street: process.env.STREET,
                                    city: process.env.CITY,
                                    postalCode: process.env.POSTAL_CODE,
                                    deliveryArea: ''
                                },
                                phone: process.env.PHONE,
                                email: process.env.EMAIL,

                                restaurant,
                                products: [{
                                    product,
                                    sizeId,
                                    choiceIds
                                }],

                                deliveryMethod: OrderDeliveryMethod.DELIVERY,
                                deliveryTime: '',
                                paymentMethod: PaymentMethod.DELIVERY_CASH,

                                clientId: Math.floor(Math.random() * 10 ** 10).toString().padStart(10, '0')
                            });
                            console.log(order.data);

                            // Exit after ordering
                            process.exit(0);
                        }
                    }
                }
            }
        }
    } catch (err) {
        console.error(err);
    }
})();
