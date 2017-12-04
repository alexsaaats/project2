
const Sequelize = require('sequelize');
const sequelize = new Sequelize('saaatsmini', 'root', 'Test101!', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false
});

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Test101!',
  database : 'saaatsmini'
});