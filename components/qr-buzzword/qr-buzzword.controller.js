const express = require('express');
const  router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize');
const Role = require('_helpers/role');
const qrBuzzwordService = require('./qr-buzzword.service');

// Routes
router.get('/empleado/:id', getEmployeeById);
router.get('/test', getQrEjemplo);


module.exports = router;


function getEmployeeById(req, res, next) {
    qrBuzzwordService.getEmployeeById(req.params.id)
        .then(employee => employee ? res.json(employee) : res.sendStatus(404))
        .catch(next);
}

function getQrEjemplo(req, res, next) {
    qrBuzzwordService.qrEjemplo()
        .then(qrEjemplo => qrEjemplo ? res.json(qrEjemplo) : res.sendStatus(500))
        .catch(next);
}