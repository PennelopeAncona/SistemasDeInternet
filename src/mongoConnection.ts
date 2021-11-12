const { MongoClient } = require('mongodb');
/*
async function conexionMongo(){

    try{
        const uri = "mongodb+srv://penelope:1998gpao@cluster0.38hvb.mongodb.net/Coworking?retryWrites=true&w=majority";
        const client = new MongoClient(uri);
        console.log("Conectando a Mongo.....");
        await client.connect();
        console.log("Conexión a Mongo con éxito a la base de datos de Coworking.");
    }catch(e){
        console.log(e);
    }   
}*/
async function conexionMongo(database: string,){
    try{
        const uri = "mongodb+srv://penelope:1998gpao@cluster0.38hvb.mongodb.net/Coworking?retryWrites=true&w=majority";
        const client = new MongoClient(uri);
        await client.connect();
        console.log("Conexión a Mongo: Coworking");

    }catch(e){
        console.log(e);
    }
}
export {conexionMongo,};