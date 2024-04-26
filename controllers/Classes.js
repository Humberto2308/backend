import Classes from '../models/ClassesModel.js';
import User from "../models/UserModel.js";
import {Op} from "sequelize";

export const getAllClases = async (req, res) =>{
    try {
        let response;
        if(req.role === "admin"){
            response = await Classes.findAll({
                attributes:['uuid','className'],
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Classes.findAll({
                attributes:['uuid','className'],
                where:{
                    userId: req.userId
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getClasesById = async(req, res) =>{
    try {
        const clase = await Classes.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!clase) return res.status(404).json({msg: "mensaje de ID"});
        let response;
        if(req.role === "admin"){
            response = await Classes.findOne({
                attributes:['uuid','className'],
                where:{
                    id: clase.id
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Classes.findOne({
                attributes:['uuid','className'],
                where:{
                    [Op.and]:[{id: clase.id}, {userId: req.userId}]
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createClases = async(req, res) =>{
    const {className,} = req.body;
    try {
        await Classes.create({
            className: className,
            userId: req.userId
        });
        res.status(201).json({msg: "Clase creada correctamente"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateClases = async(req, res) =>{
    try {
        const clase = await Classes.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!clase) return res.status(404).json({msg: "Clase No encontrada"});
        const {className} = req.body;
        if(req.role === "admin"){
            await Classes.update({className},{
                where:{
                    id: clase.id
                }
            });
        }else{
            if(req.userId !== Classes.userId) return res.status(403).json({msg: "mensaje de update"});
            await Classes.update({className},{
                where:{
                    [Op.and]:[{id: Clases.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Clase actualizada"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteClases = async(req, res) =>{
    try {
        const clase = await Classes.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!clase) return res.status(404).json({msg: "mensaje de eliminado"});
        const {ClasesName} = req.body;
        if(req.role === "admin"){
            await Classes.destroy({
                where:{
                    id: clase.id
                }
            });
        }else{
            if(req.userId !== Classes.userId) return res.status(403).json({msg: "mensaje de eliminado"});
            await Classes.destroy({
                where:{
                    [Op.and]:[{id: clase.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Clase eliminada satisfactoriamente"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}