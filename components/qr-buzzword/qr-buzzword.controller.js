const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize');
const Role = require('_helpers/role');
const qrBuzzwordService = require('./qr-buzzword.service');

// Routes
router.post('/empleado', authorize(), employeeSchema, createEmployee);
router.get('/empleado/:id', getEmployeeById);
router.get('/generateSimpleQR', authorize(), generateSimpleQR);


module.exports = router;

//#region Joi validation schemas

// Employee Schema
function employeeSchema(req, res, next) {
    const schema = Joi.object({
        buzzwordId: Joi.string().required(),
        nss: Joi.string().required(),
        nombres: Joi.string().required(),
        primerApellido: Joi.string().required(),
        segundoApellido: Joi.string().allow('').optional(),
        puesto: Joi.string().required(),
        foto: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

//#endregion

// Get Employee data by Id
function getEmployeeById(req, res, next) {
    qrBuzzwordService.getEmployeeById(req.params.id)
        .then(employee => employee ? res.json(employee) : res.sendStatus(404))
        .catch(next);
}

// Generate QR Code
function generateSimpleQR(req, res, next) {
    qrBuzzwordService.generateSimpleQR(req.body)
        .then(qrUri => qrUri ? res.json({ qrUri: qrUri }) : res.sendStatus(500)) 
        .catch(next);
}

// Create new employee
function createEmployee(req, res, next) {
    qrBuzzwordService.newEmployee(req.body)
        .then(() => res.json({ message: 'Employee created successfully' }))
        .catch(next);
}



