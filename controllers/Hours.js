
import Hours from "../models/HoursModel.js";
import User from "../models/UserModel.js";
import {Op} from "sequelize";

export const getAllhours = async (req, res) =>{
    try {
        let response;
        if(req.role === "admin"){
            response = await Hours.findAll({
                attributes:[ 'uuid', 'startTime', 'endTime'],
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Hours.findAll({
                attributes:[ 'uuid', 'startTime', 'endTime'],
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

export const getHoursById = async(req, res) =>{
    try {
        const hours = await Hours.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!Hours) return res.status(404).json({msg: "mensaje de ID"});
        let response;
        if(req.role === "admin"){
            response = await Hours.findOne({
                attributes:['uuid', 'startTime', 'endTime'],
                where:{
                    id: hours.id
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Hours.findOne({
                attributes:['uuid', 'startTime', 'endTime'],
                where:{
                    [Op.and]:[{id: hours.id}, {userId: req.userId}]
                },
                include:[{
                    model: User,
                    attributes:['uuid', 'startTime, endTime']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createHours = async(req, res) =>{
    const { startTime, endTime} = req.body;
    try {
        await Hours.create({
            startTime: startTime,
            endTime: endTime,
            userId: req.userId
        });
        res.status(201).json({msg: "Hora creada correctamente"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateHours = async(req, res) =>{
    try {
        const hours = await Hours.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!hours) return res.status(404).json({msg: "Datos no encontrados"});
        const {startTime, endTime} = req.body;
        if(req.role === "admin"){
            await Hours.update({startTime, endTime},{
                where:{
                    id: hours.id
                }
            });
        }else{
            if(req.userId !== Hours.userId) return res.status(403).json({msg: "mensaje de update"});
            await Hours.update({startTime, endTime},{
                where:{
                    [Op.and]:[{id: Hours.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Hora actualizada"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteHours = async(req, res) =>{
    try {
        const hours = await Hours.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!hours) return res.status(404).json({msg: "mensaje de eliminado"});
        const {startTime, endTime} = req.body;
        if(req.role === "admin"){
            await Hours.destroy({
                where:{
                    id: hours.id
                }
            });
        }else{
            if(req.userId !== Hours.userId) return res.status(403).json({msg: "mensaje de eliminado"});
            await Hours.destroy({
                where:{
                    [Op.and]:[{id: hours.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "hora eliminada satisfactoriamente"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}