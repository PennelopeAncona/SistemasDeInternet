import { Db } from "mongodb";
import express, { NextFunction, Request,response,Response } from "express";
import { v4 as uuid } from "uuid"; 



const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json()); //body. Metemos los datos en forma de JSON
app.use(bodyParser.urlencoded({extended:true})); //body. Metemos los datos en forma de campos en postman

export const signin = async (req: Request, res: Response) => {
    const db: Db = req.app.get("db");
    const users = db.collection("users");

    if (!req.query) {
        return res.status(500).send("No params");
    }
    const email: string = req.body.email;
    const contrasena: string = req.body.contraseña;

    const usuarios = await users.findOne({email, contrasena});

    if(usuarios){
        res.status(409).send("No se pudo realizar el registro. El email ya existe");
    }else{
        
        await users.insertOne({ email,contrasena});
        res.status(200).send("Usuario añadido");
        
    }
};

export const login = async (req: Request, res: Response) => {
    const db: Db = req.app.get("db");
    const users = db.collection("users");
    const token = uuid();
    if (!req.query) {
        return res.status(500).send("No params");
    }
    const email: string = req.body.email;
    const contrasena: string = req.body.contraseña;

    //const usuarios = await users.findOneAndUpdate({email, contrasena},{$set: {token: token}});
    users.findOne({email,contrasena}).then( datos => {
        if(datos){
            //res.json(datos); OK
            users.findOneAndUpdate( {email,contrasena}, { $set: {token: token,}});
            res.status(200).send("Utiliza el siguiente token para realizar tus actividades: "+ token);
        }else{
            res.status(401).send("No se pudo realizar el login. No estás registrado o tus datos son incorrectos.");
        }
    }).catch(e =>{
        console.log(e);
    })
    
};
export const logout = async ( req: Request, res: Response,) => {
    const db: Db = req.app.get("db");
    const users = db.collection("users");
    const tokenUsuario = req.get('token');
    console.log(tokenUsuario); //token del usuario que mete por Headers

    const token =  req.headers.token;
    if (!req.query) {
        return res.status(500).send("No params");
    }

    users.findOne({token}).then( datos =>{
        if(datos){
            users.findOneAndUpdate({token},{ $set:{token: "" }}); //Borramos el token del usuario
            res.status(200).send("Logout correcto. Token borrado");
        }else{
            res.status(401).send("Token incorrecto");
        }
    })
    
   
};
/*
export const validacionToken = (req:Request, res:Response)=>{
    const db: Db = req.app.get("db");
    const users = db.collection("users");
    const seats = db.collection("seats");
    const token =  req.headers.token; //token del usuario
    
    users.findOne({token}).then( datos =>{
        const email = datos.email;
        if(datos){
            seats.updateMany({email},{ $set:{token:token}});
            res.status(200).send("Token correcto.");
        }else{
            res.status(401).send("Token incorrecto");
        }
    })

}*/



