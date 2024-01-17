const express = require('express');
const  router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize');
const Role = require('_helpers/role');
const qrBuzzwordService = require('./qr-buzzword.service');

// Routes
router.get('/:id', getEmployeeById);


module.exports = router;


function getEmployeeById(req, res, next) {
    qrBuzzwordService.getEmployeeById(req.params.id)
        .then(employee => employee ? res.json(employee) : res.sendStatus(404))
        .catch(next);
}