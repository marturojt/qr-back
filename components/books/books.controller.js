const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const booksService = require('./books.service');

// routes
router.get('/', getBooks);
router.get('/:BookID', getBookByID);
router.get('/bookFile/:BookID/:tipo', getBookFile);

module.exports = router;

// Get all books ordered by title
function getBooks(req, res, next) {
    booksService.getBooks()
        .then(books => res.json(books))
        .catch(next)
}

function getBookByID(req, res, next) {
    booksService.getBookByID(req.params)
        .then(books => res.json(books[0]))
        .catch(next)
}

function getBookFile(req, res, next) {
    booksService.getBookFile(req.params)
        .then(file => res.json(file))
        .catch(next)
}