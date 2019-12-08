import {Takeaway} from '../api';

import {Model, BaseModel, Data} from './Model';
import {HistoryProduct} from './HistoryProduct';
import {User} from './User';

@Model
export class HistoryOrder extends BaseModel {
    static relationships = ['user', 'products'];

    id?: string;
    timestamp?: string;
    addressId?: string;
    steet?: string;
    number?: string;
    postalCode?: string;
    deliveryAreaId?: string;
    deliveryArea?: string;
    city?: string;
    restaurantId?: string;
    restaurantName?: string;
    restaurantLogoUrl?: string;
    orderNumber?: string;
    deliveryMethod?: string;
    vietnamCity?: string;
    vietnamDistrict?: string;
    vietnamDistrictId?: string;
    latitude?: string;
    longitude?: string;
    totalPrice?: number;
    deliveryCosts?: number;
    transactionCosts?: number;
    paymentMethod?: string;
    discountReceived?: boolean;
    polygonStatus?: string;
    user: User;
    products: HistoryProduct[];

    constructor(takeaway: Takeaway, data: Data, user: User) {
        super(takeaway, data);
        this.user = user;
    }

    async getDetails() {
        const data = await this.takeaway.getClient().getHistoryDetails({
            email: this.user.email,
            credentials: this.user.token,
            countryCode: this.user.country.code,
            siteCode: this.user.country.siteCode,
            orderId: this.id
        });
        this.data = Object.assign({}, this.data, data.order);

        this.products = data.order.products.map((product: any) => new HistoryProduct(this.takeaway, product));
        delete this.data.products;
        return this.products;
    }
}
