const { DataTypes } = require('sequelize');

module.exports = model;


function model(sequelize) {
    const attributes = {
        buzzwordId: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
        nss: { type: DataTypes.STRING, allowNull: false },
        nombres: { type: DataTypes.STRING, allowNull: false },
        primerApellido: { type: DataTypes.STRING, allowNull: false },
        segundoApellido: { type: DataTypes.STRING },
        puesto: { type: DataTypes.STRING },
        foto: { type: DataTypes.TEXT }
    };

    const options = {
        // enable default timestamp fields (createdAt and updatedAt)
        timestamps: true       
    };

    return sequelize.define('employee_buzz', attributes, options);
}
