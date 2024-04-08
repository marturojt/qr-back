const config = require('config.json');
const { Op } = require('sequelize');
const db = require('_helpers/db');
const Role = require('_helpers/role');
const qrcodeService = require('_helpers/qr-functions');

module.exports = {
    getEmployeeById,
    generateSimpleQR,
    newEmployee
};

async function getEmployeeById(id) {
    const employee = await db.QrBuzzword.findByPk(id);
    return employee;
}

async function generateSimpleQR(body) {
    const qrURI = await qrcodeService.generateQRCode(body.text);
    return qrURI;
}

async function newEmployee(params) {
    // Validate
    if (await db.QrBuzzword.findByPk(params.buzzwordId)) {
        throw 'Employee "' + params.buzzwordId + '" is already registered';
    }

    // Create employee
    const employee = new db.QrBuzzword(params);
    await employee.save();
}