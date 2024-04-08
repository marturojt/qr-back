const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });

module.exports = verifyApiKey;

function verifyApiKey() {
    return [
        async (req, res, next) => {
            const apiKey = req.headers['x-api-key'];
            const validApiKey = process.env.API_KEY;

            if (apiKey != validApiKey) return res.status(401).json({ message: 'Unauthorized' });
            next(); // Proceed to the next middleware
        }
    ];
}