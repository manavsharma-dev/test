
/*

*This is the Method file containing,
required methods (for cerated practice dbServer )

*@author Manav Sharma
*since Monday, March 5, 2020

*/

/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./testdb');

const response = require('./dbResponse');

const saltRounds = 10;


/*
To Create a new User, for a unique email
*/

async function signUP(req, res, next) {
	const chkObj = await db.testmodel.findOne({ email: req.body.email });

	if (!chkObj) {
		new Promise((resolve, reject) => {

			// Calculating Hash for the given password for a unique email
			bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
				if (err) return err;
				req.body.password = hash;
				return resolve(req.body);
			});
		})
			.then(() => {
				// Creating the User with Provided Details in database
				db.testmodel.create(req.body);
				next();
			})
			.catch((err) => console.log(err));
		return;
	}
	console.log('Email Already Exists!!!');
	req.body.message = 'Email Already Exists!!!';
	// eslint-disable-next-line consistent-return
	return response.err(req, res);
}


/*
To Log-In in system by passing email and password in body
*/

function login(req, res, next) {
	new Promise(async (resolve, reject) => {
		const data = await db.testmodel.findOne({ email: req.body.email });

		if (!data) {
			req.body.message = 'Email Not Found !!';
			return response.err(req, res);
		}

		return resolve(data);
	}).then(async (data) => {
		// Comparing the passed password with the saved/actul passsword (Passed at Sign-Up)
		await bcrypt.compare(
			req.body.password,
			data.password,
			async (err, result) => {
				if (err) return err;

				if (result === true) {
					// Generating Token after Successful Log-In, valid only for specified time
					const token = await jwt.sign(data.toJSON(), 'privatekey', {
						expiresIn: '5m',
					});
					req.body.token = token;
					req.body.data = data;
					return next();
				}

				req.body.message = 'Invalid Password!!';
				return response.err(req, res);
			},
		);
	});
}


/*
To Get all the data stored in database
*/

async function showDB(req, res, next) {
	const obj = await db.testmodel.find();
	res.send(obj);
	console.log(obj);
}


/*
To Update User's Details through access token obtained
after user Log-In
*/

async function updateDB(req, res, next) {
	try {
		const token = req.headers.authorization;
		let decode = false;

		// Verifying token generated after log-in
		decode = await jwt.verify(token, 'privatekey');
		const data = req.body;
		if (decode) {
			// eslint-disable-next-line no-prototype-builtins
			if (data.hasOwnProperty('password')) {
				res.send(' Use Change Password API : /changepassword');
			} else {
				// If all goes well till this the details will be updated
				await db.testmodel.updateOne({ email: decode.email }, data, (error) => {
					if (error) return error;
					return next();
				});
			}
		} else {
			req.body.message = ' Invalid Token!!! ';
			response.err(req, res);
		}
		return;
	} catch (e) {
		req.body.message = e;
		// eslint-disable-next-line consistent-return
		return response.err(req, res);
	}
}


/*
For Changing Password, through access token obtained
after user Log-In by using email, password, New-Password
*/

async function changePass(req, res) {
	try {
		const token = req.headers.authorization;
		// Verifying token generated after log-in
		const result1 = await jwt.verify(token, 'privatekey', (err, decoded) => decoded);

		const data = await db.testmodel.findOne({ email: req.body.email });

		if (!data) return response.success('Email Not Found !!');
		// Comparing the passed password and actual one
		const result = await bcrypt.compare(req.body.password, data.password);

		if (data.email === result1.email) {
			if (result) {
				// You made it :) password will be changed and stored in database
				const newhash = await bcrypt.hash(req.body.newpassword, saltRounds);

				await db.testmodel.updateOne(
					{ email: req.body.email },
					{ $set: { password: newhash } },
				);
				req.body.message = ' Password Changed :)';
				return response.success(req, res);
			}
			req.body.message = ' Password Not Matched ';
			return response.err(req, res);
		}
		req.body.message = ' Wrong Access Token ';
		return response.err(req, res);
	} catch (e) {
		req.body.message = ' Something Went Wrong';
		return response.err(req, res);
	}
}


/*
For deleting a Specified User from Database
Using ObjectID Passed in request body
*/

async function deleteDB(req, res, next) {
	try {
		const data = await db.testmodel.findOne({ _id: req.body.id });
		console.log(data);
		if (data != null) {
			await db.testmodel.deleteOne({ _id: req.body.id });

			req.body.message = ' Deleted Succesfully ';
			return response.success(req, res);
		}
		req.body.message = ' Wrong ID ';
		return response.err(req, res);
	} catch (error) {
		req.body.message = error;
		return response.err(req, res);
	}
}

// Exporting the above function to be used in other files

module.exports.signUP = signUP;
module.exports.showDB = showDB;
module.exports.updateDB = updateDB;
module.exports.deleteDB = deleteDB;
module.exports.login = login;
module.exports.changePass = changePass;
