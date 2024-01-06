const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        BookID: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
        title: { type: DataTypes.STRING, allowNull: false },
        author: { type: DataTypes.STRING, allowNull: false },
        cover: { type: DataTypes.TEXT('long') },
        KindleFile: { type: DataTypes.TEXT('long') }, 
        PDFFile: { type: DataTypes.TEXT('long') }, 
        EPUBFile: { type: DataTypes.TEXT('long') },
        KindleFileExists: { type: DataTypes.BOOLEAN, defaultValue: false },
        PDFFileExists: { type: DataTypes.BOOLEAN, defaultValue: false },
        EPUBFileExists: { type: DataTypes.BOOLEAN, defaultValue: false },
        createdAt: { type: DataTypes.DATE },
        updatedAt: { type: DataTypes.DATE }
    };

    const options = {
        defaultScope: {
        },
        scopes: {
            // Determine if the file exists for the record

        }
    };

    return sequelize.define('books', attributes, options);
}