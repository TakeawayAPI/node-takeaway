export default {
    parameters: ({email, credentials, countryCode, siteCode, language}) => [
        'loyaltypoints',
        countryCode,
        email,
        credentials,
        siteCode,
        language,
        'takeawayuk-home://'
    ],
    response: {
        loyalty: {
            _self: 'ok',
            unavailable: '!unavailable',
            points: 'pts',
            url: 'url',
            externalBrowser: '!ext'
        }
    }
};
