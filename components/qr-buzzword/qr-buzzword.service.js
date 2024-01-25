const config = require('config.json');
const { Op } = require('sequelize');
const db = require('_helpers/db');
const Role = require('_helpers/role');
const qrcodeService = require('_helpers/qr-functions');

module.exports = {
    getEmployeeById,
    generateSimpleQR
};

async function getEmployeeById(id) {
    const employee = await db.QrBuzzword.findByPk(id);
    return employee;
}

async function generateSimpleQR(body) {
    const qrURI = await qrcodeService.generateQRCode(body.text);
    return qrURI;
}