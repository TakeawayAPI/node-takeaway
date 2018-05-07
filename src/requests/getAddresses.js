import {contacts} from './base';

export default {
    parameters: ({username, credentials, countryCode, siteCode}) => [
        'getaddresslist',
        username,
        credentials,
        countryCode,
        siteCode
    ],
    response: {
        contacts: contacts('cs')
    }
};
