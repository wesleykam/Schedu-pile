const dotenv = require('dotenv');

dotenv.config();

const {
    PORT,
    MONGO_URI,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL,
    NODE_ENV
} = process.env;

module.exports = {
    port: PORT,
    mongoURI: MONGO_URI,
    googleClientID: GOOGLE_CLIENT_ID,
    googleClientSecret: GOOGLE_CLIENT_SECRET,
    googleCallbackURL: GOOGLE_CALLBACK_URL,
    nodeEnv: NODE_ENV
};
