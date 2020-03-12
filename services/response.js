
const func = require('./functions');

function err(req, res) {
	res.send({
		code: 400,
		message: 'Some error occured',
		error,
	});
}

function success(req, res) {
	res.send({
		code: 200,
		message: 'Factorial calculated successfully',
		data: {
			factorial: req.body.factorial,
		},
	});
}

function loginDone(req, res) {
	res.send({
		code: 200,
		message: 'Employee Logged In successfully',
		data: req.body,
	});
}


function doneHashing(req, res) {
	res.send({
		code: 200,
		message: 'token calculated Successfully',
		token: req.body.token,
	});
}


function doneSingUp(req, res) {
	res.send({
		code: 200,
		message: 'Employee Added Successfully',
		data: {
			employee: req.body,
		},
	});
}


function deletedEmp(req, res) {
	res.send({
		code: 200,
		message: 'Employee Deleted successfully',
		data: req.body,
	});
}


module.exports.err = err;
module.exports.success = success;
module.exports.doneHashing = doneHashing;
module.exports.doneSingUp = doneSingUp;
module.exports.deletedEmp = deletedEmp;
module.exports.loginDone = loginDone;
