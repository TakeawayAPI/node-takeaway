import dotenv from 'dotenv';

// Load environment variables
dotenv.load();

export default {
    test: process.env.TEST || 'defaultTest'
};
