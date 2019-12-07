export default {
    parameters: ({country, restaurantId, orderMode}) => [
        'getcurrenttime',
        country,
        restaurantId,
        orderMode
    ],
    response: {
        time: {
            currentTime: '*ct',
            weekday: 'wd',
            open: '!rs'
        }
    }
};
