import {contacts} from './base';

export default {
    parameters: ({email, credentials, countryCode, siteCode}) => [
        'getaddresslist',
        email,
        credentials,
        countryCode,
        siteCode
    ],
    response: {
        contacts: contacts('cs')
    }
};
