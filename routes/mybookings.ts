import { Db } from "mongodb";
import express, { NextFunction, Request,response,Response } from "express";
import { ColeccionReservas } from "../schema";
import { conexionMongo } from "../src/mongoConnection";
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json()); //body. Metemos los datos en forma de JSON
app.use(bodyParser.urlencoded({extended:true})); //body. Metemos los datos en forma de campos en postman


export const mybookings = async (req:Request,res:Response) =>{
    const db: Db = req.app.get("db");
    const seats = db.collection("seats");
    const users = db.collection("users");
    if (!req.query) {
      return res.status(500).send("No params");
    }
    const token =  req.headers.token; //token del usuario
    //Autenticacion
    users.findOne({token}).then( datos =>{
        if(datos){
            //Una vez autenticados accedemos a la coleccion seats.
            const listado = seats.find({token});
            return res.status(200).send(listado);
            
        }else{
            res.status(401).send("Al parecer no tienes ninguna reserva...");
        }
    })
    
}