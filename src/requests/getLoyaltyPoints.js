export default {
    parameters: ({username, credentials, countryCode, siteCode, language}) => [
        'loyaltypoints',
        countryCode,
        username,
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
