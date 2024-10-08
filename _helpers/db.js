const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, {
        host: host,
        useUTC: false,
        // timezone: 'America/Mexico_City',
        timezone: '-05:00',
        dialect: 'mysql'
    });

    // init models and add them to the exported db object
    db.Account = require('../models/account/account.model')(sequelize);
    db.RefreshToken = require('../models/account/refresh-token.model')(sequelize);
    db.QrBuzzword = require('../models/qr-buzzword/employee-buzz.model')(sequelize);

    // vcard
    db.Vcard = require('../models/vcard/vcard.model')(sequelize);


    // define relationships
    db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
    db.RefreshToken.belongsTo(db.Account);

    // sync all models with database
    // await sequelize.sync();
    await sequelize.sync({ alter: true });
}