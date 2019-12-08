import {Takeaway} from '../api';
import {OrderInput, OrderAddress, OrderVietnamAddress} from '../inputs/OrderInput';

import {Model, BaseModel, Data} from './Model';
import {User} from './User';
import {Address} from './Address';
import {Restaurant, PaymentMethod} from './Restaurant';
import {Order} from './Order';

interface Translations {
    bg?: string;
    da?: string;
    de?: string;
    en?: string;
    fr?: string;
    it?: string;
    lu?: string;
    nl?: string;
    pl?: string;
    pt?: string;
    ro?: string;
    sv?: string;
    vi?: string;
}

@Model
export class Country extends BaseModel {
    static relationships = [];

    id?: string;
    name?: string;
    siteUrl?: string;
    pregMatch1?: RegExp;
    pregMatch2?: RegExp;
    pregMatch3?: RegExp;
    message1?: string;
    message2?: string;
    twitter?: string;
    email?: string;
    logoUrl?: string;
    iconUrl?: string;
    headerUrl?: string;
    code?: string;
    siteCode?: string;
    pickupEnabled?: boolean;
    loyaltyShopEnabled?: boolean;
    languages?: {
        languages?: string[];
    };
    descriptions?: Translations;
    movies?: Translations;
    enabledRecurringPayments?: {
        methods?: string[];
    };
    autoComplete?: {
        gp: {
            id?: string;
            apiKey?: string;
            poweredBy?: string;
        }
        nm: {
            id?: string;
            url?: string;
            apiKey?: string;
        }
        preferred?: string;
    };

    constructor(takeaway: Takeaway, data: Data) {
        super(takeaway, data);
    }

    async login(email: string, credentials: string): Promise<User> {
        const data = await this.takeaway.getClient().login({
            email,
            credentials,
            countryCode: this.code,
            siteCode: this.siteCode
        });
        return new User(this.takeaway, data.login, this);
    }

    async socialLogin(socialType: string, socialToken: string): Promise<User> {
        const data = await this.takeaway.getClient().login({
            socialType,
            socialToken,
            countryCode: this.code,
            siteCode: this.siteCode
        });
        return new User(this.takeaway, data.login, this);
    }

    async getLocation(latitude: string, longitude: string): Promise<Address> {
        const data = await this.takeaway.getClient().getGeoLocation({
            country: this.code,
            latitude,
            longitude
        });
        return new Address(this.takeaway, data.location);
    }

    async getRestaurants(postalCode: string, latitude: string, longitude: string): Promise<Restaurant[]> {
        const data = await this.takeaway.getClient().getRestaurants({
            country: this.code,
            postalCode,
            latitude,
            longitude,
            language: this.takeaway.getLanguage()
        });
        return data.restaurants.restaurants.map((restaurant) => new Restaurant(this.takeaway, restaurant, this));
    }

    async order(orderInput: OrderInput): Promise<Order> {
        const address: {[k: string]: any} = {};

        if ((orderInput.address as OrderVietnamAddress).district) {
            orderInput.address = orderInput.address as OrderVietnamAddress;

            address.street = orderInput.address.street;
            address.vietnamCity = orderInput.address.city;
            address.vietnamDistrict = orderInput.address.district;
        } else {
            orderInput.address = orderInput.address as OrderAddress;

            address.street = orderInput.address.street;
            address.postalCode = orderInput.address.postalCode;
            address.city = orderInput.address.city;
            address.deliveryArea = orderInput.address.deliveryArea;
        }

        const data = await this.takeaway.getClient().order({
            // Country information
            countryCode: this.code,
            siteCode: this.siteCode,
            language: this.takeaway.getLanguage(),

            // Address information
            name: orderInput.name,
            companyName: orderInput.companyName || '',
            phone: orderInput.phone,
            email: orderInput.email,
            ...address,
            extraAddress: '', // TODO

            // Order information
            restaurantId: orderInput.restaurant.id,
            formattedOrder: orderInput.products.map((product) => product.product.toOrderFormat(product.sizeId, product.choiceIds)),

            // Remarks
            remarks: orderInput.remarks,
            productRemarks: '', // TODO
            newsLetter: orderInput.newsLetter ? '1' : '0',

            // Delivery information
            deliveryMethod: orderInput.deliveryMethod,
            deliveryTime: orderInput.deliveryTime || '',

            // Payment information
            paymentMethod: orderInput.paymentMethod,
            bankId: orderInput.bank ? orderInput.bank.id : '',
            paymentPart: '', // TODO
            voucherCode: orderInput.paymentMethod === PaymentMethod.VOUCHER ? orderInput.voucherCode : '',

            // User/client information
            foodTrackerId: '', // TODO
            clientId: orderInput.user ? '' : orderInput.clientId || '',
            username: orderInput.user ? orderInput.user.email : '',
            // credentials: orderInput.user ? orderInput.user.credentials : '',
            credentials: '', // TODO: ^
            addressId: orderInput.user && orderInput.userAddress ? orderInput.userAddress.id || '' : '',

            // Location information
            latitude: orderInput.latitude || '',
            longitude: orderInput.longitude || '',
            isLocationAccurate: orderInput.isLocationAccurate ? '1' : '0'
        });
        return new Order(this.takeaway, data);
    }
}

export default Country;
