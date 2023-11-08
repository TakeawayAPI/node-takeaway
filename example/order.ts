import {inspect} from 'util';

import {OptionType, OrderDeliveryMethod, PaymentMethod, Takeaway} from '../src';

(async () => {
    try {
        const takeaway = new Takeaway();
        const postalCode = process.env.POSTAL_CODE as string;

        const country = await takeaway.getCountryById('NL');
        const restaurants = await country.getRestaurants(postalCode, '', '');

        for (const restaurant of restaurants) {
            if (!restaurant.name?.toLowerCase().includes('domino')) {
                continue;
            }
            if (!restaurant.address.street?.toLowerCase().includes('hortensiastraat')) {
                continue;
            }

            await restaurant.getMenu(postalCode);
            await restaurant.getBanks();

            console.log('Restaurant:');
            console.group();
            console.log(inspect(restaurant.data, false, null));
            console.groupEnd();

            console.log('Banks:');
            console.group();
            for (const bank of restaurant.banks) {
                console.log(bank.data);
            }
            console.groupEnd();

            if (restaurant.categories) {
                for (const category of restaurant.categories) {
                    for (const product of category.products) {
                        if (product.name) {
                            if (!product.name.toLowerCase().includes('pizza margaritha')) {
                                continue;
                            }
                            if (
                                product.name.toLowerCase().includes('vegan') ||
                                product.name.toLowerCase().includes('glutenvrij')
                            ) {
                                continue;
                            }

                            const sizeId = product.id as string;
                            const choiceIds: string[] = [];

                            console.log(product.data);
                            if (product.options) {
                                console.log('Options:');
                                console.group();
                                for (const option of product.options) {
                                    console.log(option.optionType, option.data);

                                    if (option.optionType === OptionType.SINGLE) {
                                        choiceIds.push(option.choices[0].id as string);
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
                                name: process.env.NAME as string,
                                address: {
                                    street: process.env.STREET as string,
                                    city: process.env.CITY as string,
                                    postalCode: process.env.POSTAL_CODE as string,
                                    deliveryArea: (process.env.POSTAL_CODE as string).substring(0, 4)
                                },
                                phone: process.env.PHONE as string,
                                email: process.env.EMAIL as string,

                                restaurant,
                                products: [
                                    {
                                        product,
                                        sizeId,
                                        choiceIds
                                    }
                                ],

                                deliveryMethod: OrderDeliveryMethod.DELIVERY,
                                deliveryTime: '',
                                paymentMethod: PaymentMethod.IDEAL,
                                bank: restaurant.banks.find((bank) => bank.name?.toLowerCase() === 'bunq'),

                                clientId: Math.floor(Math.random() * 10 ** 10)
                                    .toString()
                                    .padStart(10, '0')
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
