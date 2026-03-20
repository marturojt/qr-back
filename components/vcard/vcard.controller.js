const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize');
const Role = require('_helpers/role');
const vcardService = require('./vcard.service');

// Rutas públicas
router.get('/:id', getById);

// Rutas protegidas (Admin)
router.get('/', authorize(Role.Admin), getAll);
router.post('/', authorize(Role.Admin), vcardSchema, create);
router.put('/:id', authorize(Role.Admin), vcardSchema, update);
router.delete('/:id', authorize(Role.Admin), _delete);

module.exports = router;

// ─── handlers ────────────────────────────────────────────────────────────────

function getAll(req, res, next) {
    vcardService.getAll()
        .then(vcards => res.json(vcards))
        .catch(next);
}

function getById(req, res, next) {
    vcardService.getById(req.params.id)
        .then(vcard => vcard ? res.json(vcard) : res.sendStatus(404))
        .catch(next);
}

function create(req, res, next) {
    vcardService.create(req.body)
        .then(vcard => res.json(vcard))
        .catch(next);
}

function update(req, res, next) {
    vcardService.update(req.params.id, req.body)
        .then(vcard => res.json(vcard))
        .catch(next);
}

function _delete(req, res, next) {
    vcardService.delete(req.params.id)
        .then(() => res.json({ message: 'Vcard eliminada correctamente' }))
        .catch(next);
}

// ─── validación ──────────────────────────────────────────────────────────────

function vcardSchema(req, res, next) {
    const schema = Joi.object({
        nombres: Joi.string().required(),
        primerApellido: Joi.string().required(),
        segundoApellido: Joi.string().allow('').optional(),
        empresa: Joi.string().allow('').optional(),
        puesto: Joi.string().allow('').optional(),
        email: Joi.string().email().required(),
        telefonoMovil: Joi.string().required(),
        telefonoOficina: Joi.string().allow('').optional(),
        Address: Joi.string().allow('').optional(),
        LinkedInURL: Joi.string().allow('').optional(),
        foto: Joi.string().allow('').optional(),
        vcf: Joi.string().allow('').optional()
    });
    validateRequest(req, next, schema);
}
