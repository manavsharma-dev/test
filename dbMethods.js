/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./testdb');

const response = require('./dbResponse');

const saltRounds = 10;

async function signUP(req, res, next) {
	const chkObj = await db.testmodel.findOne({ email: req.body.email });

	if (!chkObj) {
		new Promise((resolve, reject) => {
			bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
				if (err) return err;
				req.body.password = hash;
				return resolve(req.body);
			});
		})
			.then(() => {
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

function login(req, res, next) {
	new Promise(async (resolve, reject) => {
		const data = await db.testmodel.findOne({ email: req.body.email });

		if (!data) {
			req.body.message = 'Email Not Found !!';
			return response.err(req, res);
		}

		return resolve(data);
	}).then(async (data) => {
		await bcrypt.compare(
			req.body.password,
			data.password,
			async (err, result) => {
				if (err) return err;

				if (result === true) {
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

async function showDB(req, res, next) {
	const obj = await db.testmodel.find();
	res.send(obj);
	console.log(obj);
}

async function updateDB(req, res, next) {
	try {
		const token = req.headers.authorization;
		let decode = false;
		decode = await jwt.verify(token, 'privatekey');
		const data = req.body;
		if (decode) {
			// eslint-disable-next-line no-prototype-builtins
			if (data.hasOwnProperty('password')) {
				res.send(' Use Change Password API : /changepassword');
			} else {
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
		console.log(e);
		req.body.message = e;
		// eslint-disable-next-line consistent-return
		return response.err(req, res);
	}
}

async function changePass(req, res) {
	try {
		const token = req.headers.authorization;
		const result1 = await jwt.verify(token, 'privatekey', (err, decoded) => {
			if (err) return err;
			return decoded;
		});
		const data = await db.testmodel.findOne({ email: req.body.email });

		if (!data) return response.success('Email Not Found !!');

		const result = await bcrypt.compare(req.body.password, data.password);

		if (data.email === result1.email) {
			if (result) {
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

async function deleteDB(req, res, next) {
	try {
		const data = await db.testmodel.findOne({ _id: req.params.id });
		console.log(data);
		if (data != null) {
			await db.testmodel.deleteOne({ _id: req.params.id });

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

module.exports.signUP = signUP;
module.exports.showDB = showDB;
module.exports.updateDB = updateDB;
module.exports.deleteDB = deleteDB;
module.exports.login = login;
module.exports.changePass = changePass;
