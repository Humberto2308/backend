import Signature from "../models/SignatureModel.js";
import User from "../models/UserModel.js";
import {Op} from "sequelize";

export const getAllSignature = async (req, res) =>{
    try {
        let response;
        if(req.role === "admin"){
            response = await Signature.findAll({
                attributes:['uuid','signatureName'],
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Signature.findAll({
                attributes:['uuid','signatureName'],
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

export const getSignatureById = async(req, res) =>{
    try {
        const signature = await Signature.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!signature) return res.status(404).json({msg: "mensaje de ID"});
        let response;
        if(req.role === "admin"){
            response = await Signature.findOne({
                attributes:['uuid','signatureName'],
                where:{
                    id: signature.id
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Signature.findOne({
                attributes:['uuid','signatureName'],
                where:{
                    [Op.and]:[{id: signature.id}, {userId: req.userId}]
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

export const createSignature = async(req, res) =>{
    const {signatureName,} = req.body;
    try {
        await Signature.create({
            signatureName: signatureName,
            userId: req.userId
        });
        res.status(201).json({msg: "Firma creada correctamente"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateSignature = async(req, res) =>{
    try {
        const signature = await Signature.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!signature) return res.status(404).json({msg: ""});
        const {signatureName} = req.body;
        if(req.role === "admin"){
            await Signature.update({signatureName},{
                where:{
                    id: signature.id
                }
            });
        }else{
            if(req.userId !== Signature.userId) return res.status(403).json({msg: "mensaje de update"});
            await Signature.update({signatureName},{
                where:{
                    [Op.and]:[{id: Signature.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Firma actualizada"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteSignature = async(req, res) =>{
    try {
        const signature = await Signature.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!signature) return res.status(404).json({msg: "mensaje de eliminado"});
        const {SignatureName} = req.body;
        if(req.role === "admin"){
            await Signature.destroy({
                where:{
                    id: signature.id
                }
            });
        }else{
            if(req.userId !== Signature.userId) return res.status(403).json({msg: "mensaje de eliminado"});
            await Signature.destroy({
                where:{
                    [Op.and]:[{id: signature.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Firma eliminada satisfactoriamente"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}