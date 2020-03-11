

const express = require('express'); 
const app = express();
const bodyParser = require('body-parser');
const methods = require('./dbMethods');

app.use(bodyParser.json());


app.post('/signup', methods.signUP);

app.post('/login', methods.login);

app.get('/data', methods.showDB);

app.put('/cp', methods.changePass);

app.put('/update/:id', methods.updateDB);

app.delete("/delete/:id", methods.deleteDB);

app.listen(4000,()=>{
    console.log("Listening....");
});
