
const mongoose = require('mongoose');

let mongoDBURL = 'mongodb+srv://Manav:manav123@cluster1-learn-mzwyn.mongodb.net/testdb';

//mongo "mongodb+srv://cluster1-learn-mzwyn.mongodb.net/test"  --username Manav

try{
    mongoose.connect(mongoDBURL, { 
        useNewUrlParser: true ,
        useUnifiedTopology: true });
}catch(e){
    console.log(e);
}


mongoose.connection.on('connected',()=>{
    console.log("Connection established");
});
mongoose.connection.on('disconnected', ()=>{
    console.log("Connection disconnected");
});

let schema = mongoose.Schema;
let modelSchema = new schema({

        firstName: String,
        age: Number,
        email: String,
        password: String,
});

let testmodel = mongoose.model('demo', modelSchema);

module.exports.testmodel = testmodel;