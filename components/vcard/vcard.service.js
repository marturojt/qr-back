const { config } = require('config.json');
const { Op } = require('sequelize');
const db = require('_helpers/db');
const Role = require('_helpers/role');



module.exports = {
    getVcardData
};

// function to get all vcard data for certain user
async function getVcardData(id) {
    const vcard = await db.Vcard.findAll({
        where: {
            contactId: id
        }
    });

    if (vcard.length === 0) throw 'Vcard not found';
    return vcard[0];
}