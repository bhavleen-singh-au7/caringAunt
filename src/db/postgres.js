const Sequelize = require('sequelize');

const connectDB = new Sequelize(
  process.env.DB_USERNAME,
  process.env.DB_NAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);

connectDB.authenticate()
  .then(() => { console.log("DB CONNECTED"); })
  .catch((err) => console.error(`DB GOT ERROR: ${err}`));

connectDB.sync();

module.exports = connectDB;