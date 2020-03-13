/*

*This is the Server file (for Practice Only)
*@author Manav Sharma
*since Monday, March 2, 2020

*/
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const methods = require('./dbMethods');
const response = require('./dbResponse');

app.use(bodyParser.json());

app.get('/ping', (req, res) => {
	res.send('PONG');
});

app.post('/signup', methods.signUP, response.doneSingUp);

app.post('/login', methods.login, response.loginDone);

app.post('/data', methods.showDB);

app.post('/cp', methods.changePass);

app.post('/update', methods.updateDB, response.updated);

app.post('/delete', methods.deleteDB, response.deleted);

app.listen(3000, () => {
	// eslint-disable-next-line no-console
	console.log('Listening....');
});
