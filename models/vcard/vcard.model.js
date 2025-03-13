const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        contactID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        nombres: { type: DataTypes.STRING, allowNull: false },
        primerApellido : { type: DataTypes.STRING, allowNull: false },
        segundoApellido : { type: DataTypes.STRING },
        empresa: { type: DataTypes.STRING },
        puesto: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING, allowNull: false },
        telefonoMovil: { type: DataTypes.STRING, allowNull: false },
        telefonoOficina: { type: DataTypes.STRING },
        Address: { type: DataTypes.STRING },
        LinkedInURL: { type: DataTypes.STRING },
        foto: { type: DataTypes.TEXT('long') },
        vcf: { type: DataTypes.TEXT('long') }
    };

    const options = {
        // enable default timestamp fields (createdAt and updatedAt)
        timestamps: true
    };

    return sequelize.define('vcard', attributes, options);
}