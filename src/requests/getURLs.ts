export default {
    parameters: ({country, language}) => ['geturls', country, language],
    response: {
        urls: {
            _self: 'gu',
            country: 'cc',
            language: 'ln',
            urls: {
                _self: 'urls',
                items: [
                    {
                        _self: 'it',
                        type: 'typ',
                        url: 'url'
                    }
                ]
            }
        }
    }
};
