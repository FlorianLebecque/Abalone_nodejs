const Sequilize = require("sequelize");
const db = new Sequilize(
    "abalone",
    "dmy",
    "123",
    {
        dialect: "mysql",
        host: "db"
    }
);

module.exports = db;