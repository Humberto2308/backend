// En models/Hours.js

import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "../models/UserModel.js";

const { DataTypes } = Sequelize;

const Hours = db.define('hours', {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
             notEmpty: true 
            }
    },
    startTime: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    endTime: {
        type: DataTypes.TIME,
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
Users.hasMany(Hours);
Hours.belongsTo(Users, {foreignKey: 'userId'});



export default Hours;
