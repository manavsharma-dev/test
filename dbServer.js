/*

*This is the Server file (for Practice Only)
*@author Manav Sharma
*since Monday, March 2, 2020

*/
const express = require('express');

require('dotenv').config({ path: '/home/dell1/Desktop/app/.env' });

const app = express();
const bodyParser = require('body-parser');
const methods = require('./dbMethods');
const response = require('./dbResponse');
const mailer = require('./mailer');

app.use(bodyParser.json());
const port = parseInt(process.env.PORT, 10);

app.get('/ping', (req, res) => {
	res.send('PONG');
});


app.post('/signup', methods.signUP, mailer.checkEmail, response.doneSingUp);

app.get('/verify', mailer.verify);

app.post('/login', methods.login, response.loginDone);

app.post('/data', methods.showDB);

app.post('/cp', methods.changePass);

app.post('/update', methods.updateDB, response.updated);

app.post('/delete', methods.deleteDB, response.deleted);

app.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log(`Listening on PORT ${process.env.PORT}`);
});
