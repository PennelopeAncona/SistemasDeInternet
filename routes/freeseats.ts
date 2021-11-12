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


ruta.get('/', async(req:any, res:any) =>{
    try{
        const docs = await client.database.collection(esquema).countDocuments();
        if(docs < 0 ){
            try{
                if( (req.body.dia>31 ||req.body.dia<=0) || (req.body.month>12 ||req.body.month<=0) || (req.body.year>2023 ||req.body.year<=0)){
                    res.status(500).send("Los datos deben de tener lógica y no puede superar el año 2023");
                }else{
                    const dato = await meterDocumento(req.body);
                    res.json("Todo OK" + dato);
                }
                
            }catch (e) {
                res.status(404);
                console.error('error', e );
            }
        }else{
            //Cuando ya existen documentos los imprimimos
            var printDays = database.collection('Reservas');
            printDays.find().toArray(function (err:any, docs:any) {
            req.send(docs);
            });
        }
    }catch(e){

    }
})

async function meterDocumento(body:any){
    var doc = {day: body.day, month: body.month, year: body.year}
    const anadido = esquema.insertOne(doc,function(err:any, res:any) {
        if (err) throw err;
        console.log("1 document inserted");
    })    
   return anadido;
}
/*
const getTodosLosDias= async (body:any): Promise<Array<estrcuturaDocumento>> =>{
    /*
    try {
        return await Promise.all(body.map((bodie) => getDia(bodie)));
      } catch (e) {
        console.error(e);
        throw e;
      }

}
export const getDia = async (body:any): Promise<estrcuturaDocumento> => {
    /*try {
      return (esquema.each().map( (x) => {
                    //Me he rayado 
      }))
    } catch (e) {
      console.error(e);
      throw e;
    }
  };
*/
  module.exports =ruta;