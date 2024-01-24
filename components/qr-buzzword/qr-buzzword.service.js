const config = require('config.json');
const { Op } = require('sequelize');
const db = require('_helpers/db');
const Role = require('_helpers/role');
const QRCode = require('qrcode');

module.exports = {
    getEmployeeById,
    qrEjemplo
};

async function getEmployeeById(id) {
    const employee = await db.QrBuzzword.findByPk(id);
    return employee;
}

async function qrEjemplo() {
    const qrEjemplo = QRCode.toDataURL('https://freejolitos.com', function (err, url) {
        console.log(url)
    });
    const qrEjemplo2 = QRCode.toString('https://freejolitos.com', { type: 'terminal' }, function (err, url) {
        console.log(url)
    });
    return 1;
}