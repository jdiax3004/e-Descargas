const Sequelize = require('sequelize');
const config = require('./config');

const db = {};

const sequelize = new Sequelize(
  config.database.DB_NAME,
  config.database.DB_USERNAME,
  config.database.DB_PASSWORD,
  {
    host: config.database.DB_HOST,
    dialect: 'mssql',
    dialectOptions: {
      //  ConnectionError: Server requires encryption, set 'encrypt' config option to true
      options: {
        encrypt: true,
      },
    },
  }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
