import { estrcuturaDocumento } from "../schema";
import { timeStamp } from "console";
const { MongoClient } = require('mongodb');
const express = require("express");
const ruta = express.Router();

ruta.use(express.json());
const url = "mongodb+srv://penelope:1998gpao@cluster0.38hvb.mongodb.net/Coworking?retryWrites=true&w=majority";
const client = new MongoClient(url);
console.log("Conexión a Mongo: Coworking");
client.connect();
const database = client.db("Coworking");
const esquema = database.collection("Reservas");
{_id: "12"}
ruta.post('/',async(req:any, res:any)=>{
    esquema.findOneAndUpdate({day:req.body.day, month:req.body.month, year: req.body.year},{
        if(esquema.Object.keys().find(key => "ocupado") === false){
            $set:{
                ocuapdo: true;
            }
        }else{
            $set:{
                ocuapdo: false;
            }
        }
    }, new)
})

module.exports =ruta;