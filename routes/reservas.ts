import { estrcuturaDocumento } from "../schema";
import { timeStamp } from "console";
const { MongoClient } = require('mongodb');
const express = require("express");
const ruta = express.Router();
var timestamp = new Date().getTime();

ruta.use(express.json());
const url = "mongodb+srv://penelope:1998gpao@cluster0.38hvb.mongodb.net/Coworking?retryWrites=true&w=majority";
const client = new MongoClient(url);
console.log("Conexión a Mongo: Coworking");
client.connect();
const database = client.db("Coworking");
const esquema = database.collection("Reservas");

//********************GET*************************
ruta.get('/',async (req:any,res:any) =>{
    res.status(200).json("Listo para procesar solicitudes. Dia de hoy: " + timestamp);
})


module.exports =ruta;
