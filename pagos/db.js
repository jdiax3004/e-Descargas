const Sequelize = require('sequelize');

const db = {};

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
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
