// En models/Observations.js

import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "../models/UserModel.js";

const { DataTypes } = Sequelize;

const Observations = db.define('observations', {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
             notEmpty: true }
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    // Puedes agregar más atributos según tus necesidades
},{
    userId:{ 
   type: DataTypes.INTEGER,
    allowNull: false,
     validate:{
        notEmpty: true

        } 
       }
       
       },{ freezeTableName: true 
       });

// Relación entre Users y Classes (muchos a muchos)
Users.hasMany(Observations);
Observations.belongsTo(Users, {foreignKey: 'userId'});



export default  Observations;
