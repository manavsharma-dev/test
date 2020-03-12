
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const methods = require('./dbMethods');
const response = require('./dbResponse');

app.use(bodyParser.json());


app.post('/signup', methods.signUP, response.doneSingUp);

app.post('/login', methods.login, response.loginDone);

app.get('/data', methods.showDB);

app.put('/cp', methods.changePass);

app.put('/update/:id', methods.updateDB, response.updated);

app.delete('/delete/:id', methods.deleteDB, response.deleted);

app.listen(4000, () => {
	// eslint-disable-next-line no-console
	console.log('Listening....');
});
