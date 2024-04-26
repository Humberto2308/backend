import Observation from '../models/ObservationsModel.js';
import User from "../models/UserModel.js";
import {Op} from "sequelize";

export const getAllObservation = async (req, res) =>{
    try {
        let response;
        if(req.role === "admin"){
            response = await Observation.findAll({
                attributes:['uuid','content'],
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Observation.findAll({
                attributes:['uuid','content'],
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

export const getObservationById = async(req, res) =>{
    try {
        const observation = await Observation.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!observation) return res.status(404).json({msg: "mensaje de ID"});
        let response;
        if(req.role === "admin"){
            response = await Observation.findOne({
                attributes:['uuid','content'],
                where:{
                    id: observation.id
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Observation.findOne({
                attributes:['uuid','content'],
                where:{
                    [Op.and]:[{id: observation.id}, {userId: req.userId}]
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

export const createObservation = async(req, res) =>{
    const {content} = req.body;
    try {
        await Observation.create({
            content: content,
            userId: req.userId
        });
        res.status(201).json({msg: "Observacion creada correctamente"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateObservation = async(req, res) =>{
    try {
        const observation = await Observation.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!observation) return res.status(404).json({msg: "Datos no encontrados"});
        const {content} = req.body;
        if(req.role === "admin"){
            await Observation.update({content},{
                where:{
                    id: observation.id
                }
            });
        }else{
            if(req.userId !== Observation.userId) return res.status(403).json({msg: "mensaje de update"});
            await Observation.update({content},{
                where:{
                    [Op.and]:[{id: Observation.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Observación actualizada"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteObservation = async(req, res) =>{
    try {
        const observation = await Observation.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!observation) return res.status(404).json({msg: "observacion eliminado"});
        const {content} = req.body;
        if(req.role === "admin"){
            await Observation.destroy({
                where:{
                    id: observation.id
                }
            });
        }else{
            if(req.userId !== Observation.userId) return res.status(403).json({msg: "observacion de eliminado"});
            await Observation.destroy({
                where:{
                    [Op.and]:[{id: observation.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Observacion eliminada satisfactoriamente"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}