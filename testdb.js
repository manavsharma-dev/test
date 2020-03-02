
const mongoose = require('mongoose');

let mongoDBURL = 'mongodb+srv://Manav:manav123@cluster1-learn-mzwyn.mongodb.net/testdb';

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
        password: Number,
});

let testmodel = mongoose.model('demo', modelSchema);

module.exports.testmodel = testmodel;