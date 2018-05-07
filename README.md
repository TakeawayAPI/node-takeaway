# Node.js Takeaway.com API

Unofficial JavaScript implementation of the [Takeaway.com](https://www.takeaway.com) API.

## Installation
```
yarn add takeaway
```

## Endpoints
- [x] Banks
- [ ] CheckVoucher
- [x] Config
- [ ] CreateAccount
- [x] Discounts
- [x] GeoLocation
- [x] HistoryDetails
- [ ] LoyaltyPoints
- [ ] ImportOrder
- [x] Menucard
- [ ] OnlinePaymentStatus
- [ ] Order
- [ ] OrderWithOnlinePayment
- [ ] RecurringPayment
- [x] ResetPassword
- [x] RestaurantData
- [x] RestaurantList
- [x] Reviews
- [x] ServerTime
- [x] URLs
- [x] UserAddressList
- [x] UserLogin
- [ ] UserOrderHistory
- [ ] VietnamDeliveryArea

## Usage
```javascript
import {inspect} from 'util';

import {TakeawayConfig, TakeawayClient} from 'takeaway';

(async () => {
    try {
        // Initialize configuration
        // See `src/config.js` for defaults
        const config = new TakeawayConfig({
            language: 'nl',
            url: 'https://nl.citymeal.com/android/android.php'
        });

        // Initialize client
        const client = new TakeawayClient(config);

        // Request language configurations
        let data = await client.getConfig();
        console.log(inspect(data, false, null));

        // Request restaurants list for area
        data = await client.getRestaurants({
            postalCode: '7500',
            country: '1',
            latitude: '52.0000000',
            longitude: '6.0000000',
            language: 'nl'
        });
        console.log(inspect(data, false, null));
    } catch (err) {
        console.error(err);
    }
})();
```

## Development
## Setup
```bash
# Clone Git repository
git clone git@github.com:TakeawayAPI/node-takeaway.git
cd node-takeaway

# Install dependencies
yarn
```
