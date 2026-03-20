const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

    const connection = await mysql.createConnection({
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASSWORD
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);

    const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
        host: DB_HOST,
        useUTC: false,
        timezone: '-05:00',
        dialect: 'mysql'
    });

    db.Account = require('../models/account/account.model')(sequelize);
    db.RefreshToken = require('../models/account/refresh-token.model')(sequelize);
    db.Vcard = require('../models/vcard/vcard.model')(sequelize);

    db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
    db.RefreshToken.belongsTo(db.Account);

    if (process.env.NODE_ENV !== 'production') {
        await sequelize.sync();
    }
}
