const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Vcard.findAll({
        attributes: { exclude: ['foto', 'vcf'] }
    });
}

async function getById(id) {
    const vcard = await db.Vcard.findOne({ where: { contactID: id } });
    if (!vcard) throw 'Vcard no encontrada';
    return vcard;
}

async function create(params) {
    const vcard = new db.Vcard(params);
    await vcard.save();
    return vcard;
}

async function update(id, params) {
    const vcard = await db.Vcard.findOne({ where: { contactID: id } });
    if (!vcard) throw 'Vcard no encontrada';

    Object.assign(vcard, params);
    await vcard.save();
    return vcard;
}

async function _delete(id) {
    const vcard = await db.Vcard.findOne({ where: { contactID: id } });
    if (!vcard) throw 'Vcard no encontrada';
    await vcard.destroy();
}
