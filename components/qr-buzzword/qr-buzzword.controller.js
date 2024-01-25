const express = require('express');
const  router = express.Router();
// const Joi = require('joi');
// const validateRequest = require('_middleware/validate-request');
// const authorize = require('_middleware/authorize');
// const Role = require('_helpers/role');
const qrBuzzwordService = require('./qr-buzzword.service');

// Routes
router.get('/generateSimpleQR', generateSimpleQR);
router.get('/empleado/:id', getEmployeeById);

module.exports = router;

function getEmployeeById(req, res, next) {
    qrBuzzwordService.getEmployeeById(req.params.id)
        .then(employee => employee ? res.json(employee) : res.sendStatus(404))
        .catch(next);
}

function generateSimpleQR(req, res, next) {
    qrBuzzwordService.generateSimpleQR(req.body)
        .then(qrUri => qrUri ? res.json({ qrUri: qrUri }) : res.sendStatus(500)) 
        .catch(next);
}