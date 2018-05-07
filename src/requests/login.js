import {contacts} from './base';

export default {
    parameters: ({username, credentials, countryCode, clientId = '', siteCode, socialType = '', socialToken = ''}) => [
        'userauth',
        username,
        credentials,
        countryCode,
        clientId,
        siteCode,
        socialType && socialType.length > 0 ? '1' : '0',
        socialType,
        socialToken
    ],
    response: {
        login: {
            _self: 'ua',
            id: 'id',
            token: 'tk',
            firstName: 'fn',
            lastName: 'ln',
            email: 'em',
            oldOrders: 'oo',
            ac: 'ac',
            social: {
                _self: 'sm',
                id: 'sid',
                username: 'un'
            },
            migrated: '!mig',
            contacts: contacts('cs')
        }
    }
};
