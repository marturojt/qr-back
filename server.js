require('dotenv').config({ path: require('path').join(__dirname, '.env') });
require('rootpath')();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('_middleware/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

// routes
app.use('/accounts', require('./components/accounts/accounts.controller'));
app.use('/vcard', require('./components/vcard/vcard.controller'));

// swagger docs
app.use('/api-docs', require('_helpers/swagger'));

// global error handler
app.use(errorHandler);

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));
