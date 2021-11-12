console.log("Hello World");

import { Db } from "mongodb";
import {conexionMongo} from '../src/mongoConnection';
import express, { NextFunction, Request,Response } from "express";
const reservas = require('../routes/reservas');
const book = require('../routes/book');
const freeseats = require('../routes/freeseats');
const morgan = require('morgan');
var timestamp = Date.now();
const today = new Date(timestamp);

async function run(){
    try{
        const database: string = "Coworking"
        await conexionMongo(database);
        const app = express();
        app.use(express.json()); //body. Metemos los datos en forma de JSON
        app.use(express.urlencoded({ extended: true })); //body. Metemos los datos en forma de campos en postman
        app.use(morgan('tiny'));
        console.log("Morgan habilitado");

        app.use((req, res, next) => {
            console.log(req.query.token || "No token");
            console.log(req.headers["auth-token"]);
            next();
          });
          app.get("/status", async (req, res) => {
            res.status(200).send("Listo para procesar solicitudes. Dia de hoy: " + today.toString()).end();
          });

          app.use('/reservas',reservas);
          app.use('/freeseats',freeseats);
          app.use('/book',book);
          app.listen(3000, () => console.log("Escuchando en el puerto 3000"));
    }catch(e) {
        console.error('error', e );
    }
    
}

run();