const { MongoClient } = require('mongodb');

async function conexionMongo(){
    try{
        const dbName: string = "Coworking";
        const uri = "mongodb+srv://penelope:1998gpao@cluster0.38hvb.mongodb.net/${dbName}?retryWrites=true&w=majority";
        const client = new MongoClient(uri);
        await client.connect();
        console.log("Conexión a Mongo: Coworking");
        return client.db(dbName);

    }catch(e){
        console.log(e);
    }
}
export {conexionMongo,};