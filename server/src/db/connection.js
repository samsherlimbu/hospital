const mongoose = require('mongoose')

const dbConnect = async()=>{
    try{
        const connection =  await mongoose.connect('mongodb://127.0.0.1:27017/hospitals');
    if(connection)
        console.log('connected to mongodb');
    }catch(err){
    console.log(err);
    process.exit(1);
    }
    
}

module.exports = dbConnect