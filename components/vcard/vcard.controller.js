const express = require('express');
const router = express.Router();
// const Joi = require('joi');
// const validateRequest = require('_middleware/validate-request');
// const authorize = require('_middleware/authorize');
const verifyApiKey = require('_middleware/verifyapikey');
// const Role = require('_helpers/role');
const vcardService = require('./vcard.service');

// Routes
router.get('/:id', verifyApiKey(), getVcardData);


module.exports = router;


// function to get all vcard data for certain user
function getVcardData(req, res, next) {
    vcardService.getVcardData(req.params.id)
        .then(vcard => vcard ? res.json(vcard) : res.sendStatus(404))
        .catch(next);
}