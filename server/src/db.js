require("dotenv").config();
const { Sequelize } = require("sequelize");
const DriverModel = require('./models/Driver');
const TeamModel = require('./models/Team');

const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/drivers`, {
  logging: false, 
  native: false, 
});


 DriverModel(sequelize);
 TeamModel(sequelize);

 const { Driver, Team} = sequelize.models;
// Establecer relaciones
Driver.belongsToMany(Team, { through: 'DriverTeam' });
Team.belongsToMany(Driver, { through: 'DriverTeam'});

module.exports = {
  ...sequelize.models,
  conn: sequelize
};

