import crypto from 'crypto';

export const md5 = (data) => {
    return crypto.createHash('md5').update(data).digest('hex');
};
