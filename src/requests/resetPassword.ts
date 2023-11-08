export default {
    parameters: ({email, country, language, siteCode}) => ['resetpassword', email, country, language, siteCode],
    response: {
        reset: {
            _self: 'ok',
            status: 'status'
        }
    }
};
