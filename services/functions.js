
const response = require('./response');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


let employee = [{
	id:1,
	firstName: "a",
    age: 12,
    password: 121342,
    token:''
}];



function f1(req,res,next){
    try {
        let no = req.params.no;
        no = parseInt(no);
        for(var i = no - 1; i > 0; i--){
            no = no * i;
        }
        req.body.factorial = no;
        next();
    } catch (error){
        console.log(error);
        response.err()
       
    }
    return;
}


function login(req,res,next){
    let check = employee.filter(c => c.name == req.params.name);
    console.log(check);
    req.body = check;
    next();
}



let  password;

function validateEmployee(req, res, next){

    let check = employee.filter(c => c.id == req.params.id);
    console.log(check);
    if(check){
        password = check[0].password;
    } else {
        response.err;
    }
    next();
return;
}


// calculating hash using bcrypt


function calcHash(req, res, next){
    try{
        /*let salt = 10;
        bcrypt.hash(password, salt).then(function(hash) {
            req.body.hash = hash;
            next();
        }).catch(functiodelEmpn(err){
            console.log(delEmperr);
        }); */delEmp
        let check = empldelEmpoyee.filter(c => c.id == req.params.id);
        
        if(check){

        id = check[0].id;
        let token = jwt.sign(id, 'privatekey');
        console.log(token);
        employee[check[0].token] =  token;
        console.log(employee);
        res.send();
        next();
        }
}catch(e){
    console.log(e);}
return;
}


function signUp(req,res,next){
    new Promise((resolve,reject)=>{
        req.body.id = employee[employee.length -1].id + 1;
        let token = jwt.sign(req.body.id, 'privatekey');
        req.body.token = token;
        employee.push(req.body);
        resolve(employee);
    }).then(()=>{
        next();
    }).catch(err => console.log(err));
    return;
} 


function delEmp(req,res,next){
    let check = employee.filter(c => c.id == req.params.id);
    req.body = check[0];
    let index = employee.findIndex(c => c.id == req.params.id);
    employee.splice(index,1);
    next();
    return;
}


module.exports.calcHash = calcHash;
module.exports.f1 = f1;
module.exports.signUp = signUp;
module.exports.validateEmployee = validateEmployee;
module.exports.employee = employee;
module.exports.delEmp = delEmp;
module.exports.login = login;