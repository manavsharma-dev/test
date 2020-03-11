
const db = require('./testdb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const saltRounds = 10;

async function signUP(req,res,next){

    let chkObj = await db.testmodel.findOne({email:req.body.email});

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

        if(!data) return res.send("Email Not Found !!");
        else{
            resolve(data);}
        }).then(async (data)=>{
            console.log(data);
            await bcrypt.compare(req.body.password, data.password, async (err, result)=>{
                if(err) return err;
                if(result == true){

                    let token = await jwt.sign(data.toJSON(), 'privatekey', { expiresIn: '5m' });
                    return res.status(200).send({ data,
                        token:token
                    });
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
        let token  =  req.headers.authorization;
        let decode = false;
        decode = await jwt.verify(token,'privatekey');
        let data = req.body;
        if (decode){
            if(data.hasOwnProperty('password')){
                res.send(' Use Change Password API : /changepassword');
            }else{
                await db.testmodel.updateOne({email:decode.email}, data,(error)=>{
                    if(error) return error;
                    return res.send('Updated Succesfully :)')});}
        }else{
            res.send("Invalid Token!!!");
        }
    }catch(e){
        console.log(e);
        res.status(500).send(e);}
    return;
}


async function changePass(req,res){

    try{
        let token  =  req.headers.authorization;
        let result1 = await jwt.verify(token,'privatekey', (err, decoded)=>{
                if(err) return err;
                return decoded;
        });
        let data = await db.testmodel.findOne({email: req.body.email});

        if(!data) return res.send("Email Not Found !!");

        let result = await bcrypt.compare(req.body.password, data.password);

        if (data.email == result1.email){
            if(result){
                let newhash = await bcrypt.hash(req.body.newpassword,saltRounds)
                console.log("newhash " + newhash);
                await db.testmodel.updateOne({email: req.body.email}, {$set:{password:newhash}});
                return res.send("Password Changed :)");000
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