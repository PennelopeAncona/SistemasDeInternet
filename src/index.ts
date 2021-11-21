console.log("Hello World");

import { Db } from "mongodb";
import {conexionMongo} from '../src/mongoConnection';
import express, { NextFunction, Request,Response } from "express";
import { signin,login,logout} from "../routes/logs";
import { mybookings } from "../routes/mybookings";

const book = require('../routes/book');
const freeseats = require('../routes/freeseats');
const status = require('../routes/status');
const free = require('../routes/free');
const morgan = require('morgan');
const bodyParser = require('body-parser');


const run = async() =>{
    
  const db:Db= await conexionMongo(); 
  const app = express();
  app.use(bodyParser.json()); //body. Metemos los datos en forma de JSON
  app.use(bodyParser.urlencoded({extended:true})); //body. Metemos los datos en forma de campos en postman
  app.use(morgan('tiny'));
  app.set("db", db);
  console.log("Morgan habilitado");

  app.use((req, res, next) => {

    next();
  });

  app.get("/status",status); //OK
  app.post('/book',book); //OK puesto que queremos reservar
  app.get('/freeseats',freeseats); //OK dias disponibles a partir del dia introducido
  app.post('/free',free); //Ok libera el puesto que he reservado
  app.post('/signin', signin); //OK
  app.post('/login', login); //OK
  app.post('/logout', logout); //OK
  app.get('/mybookings',mybookings); //FALTA... Lista de todas mis reservas futuras

  app.listen(3000, () => console.log("Escuchando en el puerto 3000"));
};

try{
  run();
}catch(e) {
  console.log(e);
}