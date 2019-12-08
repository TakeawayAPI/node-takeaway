import {Restaurant, Product, PaymentMethod, User, Address} from '../models';

export interface OrderAddress {
    street: string;
    city: string;
    postalCode: string;
    deliveryArea: string;
}

export interface OrderVietnamAddress {
    street: string;
    city: string;
    district: string;
}

export enum OrderDeliveryMethod {
    DELIVERY = '0',
    PICKUP = '1'
}

export interface OrderInput {
    name: string;
    companyName?: string;
    address: OrderAddress | OrderVietnamAddress;
    phone: string;
    email: string;

    restaurant: Restaurant;
    products: Array<{
        product: Product;
        sizeId: string;
        choiceIds: string[];
    }>;

    remarks?: string;
    newsLetter?: boolean;

    deliveryMethod: OrderDeliveryMethod;
    deliveryTime: string;
    paymentMethod: PaymentMethod;
    voucherCode?: string;

    clientId?: string;
    user?: User;
    userAddress?: Address;

    latitude?: boolean;
    longitude?: boolean;
    isLocationAccurate?: boolean;
}
