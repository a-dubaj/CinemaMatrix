const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const db = {};

let sequelize = new Sequelize(
    process.env.DATABASE_URL || "postgres://postgres:Tmd1ecOqbg@localhost:5432/cinemamatrix", // database url and login credentials
    {
        dialect: "postgres",
        protocol: "postgres",
        dialectOptions: {
            useUTC: false, // for reading from database
        },
        timezone: "+07:00", //  for writing to database
    }
);

fs.readdirSync(__dirname)
    .filter((file) => {
        return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;