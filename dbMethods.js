
const db = require('./testdb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const saltRounds = 10;

function signUP(req,res,next){

    let chkObj =  db.testmodel.findOne({email:req.body.email});

    if(!chkObj){
        new Promise((resolve, reject)=>{
            bcrypt.hash(req.body.password, saltRounds,(err, hash)=>{
            if(err) return err;
            req.body.password = hash;
            resolve(req.body);});
        }).then(()=>{ console.log(req.body);
        db.testmodel.create(req.body);
        }).catch(err => console.log(err));
        res.send('Document Created Succesfully');
        return;
    }else{
        console.log("Email Already Exists!!!");
        res.send("Email Already Exists!!!");
    }
}


function login(req,res,next){
    new Promise(async (resolve,reject)=>{
        let data = await db.testmodel.findOne({email:req.body.email});

        if(!data) return res.send("Wrong Email !!");
        else{
            resolve(data);}
        }).then(async (data)=>{
            await bcrypt.compare(req.body.password, data.password, async (err, result)=>{
                if(err) return err;
                if(result == true){
                    console.log(result);
                    let token = await jwt.sign(data.toJSON(), 'privatekey', { expiresIn: '2m' });
                    return res.send("token : " + token + " Expires in : 2 minutes");
                }else{
                    return res.send("Password Not Matched...")}
            });
        });
    return ;
}


async function showDB(req,res,next){
    let obj = await db.testmodel.find();
    res.send(obj);
    console.log(obj);
    return;
}


async function updateDB(req,res,next){
    try{
        let token  =  req.body.token;
        jwt.verify(token,'privatekey', (err, decode)=>{
            if(err) return err;
            return console.log(decode);
        });

        let data = req.body;
        if (data.email === token.email){
            if(data.hasOwnProperty('password')){
                res.send(' Use Change Password API : /changepassword');
            }else{
                await db.testmodel.updateOne({_id:req.params.id}, data,(error)=>{
                    if(error) return error;
                    return res.send('Updated Succesfully :)')});}
        }else{
            res.send("Either Access Token Expired or Wrong ");
        }
    }catch(e){
        res.status(500).send(e);}
    return;
}


async function changePass(req,res){

    try{
        let token  =  req.body.token;
        jwt.verify(token,'privatekey', (err, decode)=>{
            if(err) return err;
            return console.log(decode);
        });
        let data = await db.testmodel.findOne({email: req.body.email});

        let result = await bcrypt.compare(req.body.password, data.password);
        if (data.email === token.email){
            if(result){
                let newhash = await bcrypt.hash(req.body.newpassword,saltRounds)
                console.log("newhash " + newhash);
                await db.testmodel.updateOne({email: req.body.email}, {$set:{password:newhash}});
                return res.send("Password Changed :)");
            }else{
                res.send("Password Not Matched!!");}
            return;
        }else{
            res.send("Wrong Access Token ");
        }
    }catch(e){
        res.send("Something Went Wrong !!" + e);
    }
}


async function deleteDB(req,res,next){
    try {
        await db.testmodel
        .deleteOne({ _id: req.params.id });
        res.send('Deleted Succesfully :(');
    } catch (error) {
        res.status(500).send(error);}
    return;
}


module.exports.signUP = signUP;
module.exports.showDB = showDB;
module.exports.updateDB = updateDB;
module.exports.deleteDB = deleteDB;
module.exports.login = login;
module.exports.changePass = changePass;