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
- [x] LoyaltyPoints
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
- [x] UserOrderHistory
- [ ] VietnamDeliveryArea

## Example
```javascript
import {inspect} from 'util';

import {Takeaway, TakeawayConfig} from 'takeaway';

(async () => {
    try {
        // Initialize configuration
        // See `src/config.js` for defaults
        const config = new TakeawayConfig({
            language: 'nl',
            url: 'https://nl.citymeal.com/android/android.php'
        });

        // Initialize Takeaway API
        const takeaway = new Takeaway(config);

        // Fetch country
        const country = await takeaway.getCountryById('NL');

        // Login to the country specific site
        const user = await country.login('test@exampl.com', 'testpassword123');
        console.log(inspect(user, false, null));

        // Request restaurants list for area
        const restaurants = await country.getRestaurants('7500', '52.0000000', '6.0000000');
        console.log(inspect(restaurants, false, null));
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
