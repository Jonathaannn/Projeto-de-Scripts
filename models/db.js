const Sequelize = require('sequelize');

//conexão com banco de dados
const sequelize = new Sequelize('projeto', 'root', '%ky0t#$', {
    host: "localhost",
    dialect: 'mysql'
});

module.exports = {
    sequelize: sequelize,
    Sequelize: Sequelize
}