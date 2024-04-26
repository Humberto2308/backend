import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "../models/UserModel.js";

const { DataTypes } = Sequelize;

const Classes = db.define('classes', {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
             notEmpty: true }
    },
    className: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 50]
        }
    },
    classDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    // Puedes agregar más atributos según tus necesidades(codigo es el mismo en todos los modelos)
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
Users.hasMany(Classes);
Classes.belongsTo(Users, {foreignKey: 'userId'});

export default Classes;
