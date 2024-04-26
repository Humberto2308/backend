import {Sequelize} from "sequelize";

const db = new Sequelize('asistencia', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;
