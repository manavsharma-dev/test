
const express = require('express'); 
const app = express();
const bodyParser = require('body-parser'); 

const func = require('../services/functions');
const response = require('../services/response');

app.use(bodyParser.json());

app.get('/allemp',(req,res)=>{
    res.send(func.employee);
});

app.get('/fact/:no', func.f1, response.success);

app.post('/auth/:id', func.validateEmployee, func.calcHash, response.doneHashing);

app.post('/signup',func.signUp, response.doneSingUp);

app.get('/login/:name', func.login, response.loginDone);

app.delete('/del/:id', func.delEmp, response.deletedEmp);

app.listen(4000,()=>{
    console.log("Listening.....");
});