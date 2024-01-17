const config = require('config.json');
const { Op } = require('sequelize');
const db = require('_helpers/db');
const Role = require('_helpers/role');

module.exports = {
    getEmployeeById
};

async function getEmployeeById(id) {
    const employee = await db.QrBuzzword.findByPk(id);
    return employee;
}
