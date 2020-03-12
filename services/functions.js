
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const response = require('./response');


const employee = [{
	id: 1,
	firstName: 'a',
	age: 12,
	password: 121342,
	token: '',
}];


function f1(req, res, next) {
	try {
		let { no } = req.params;
		no = parseInt(no);
		for (let i = no - 1; i > 0; i--) {
			no *= i;
		}
		req.body.factorial = no;
		next();
	} catch (error) {
		console.log(error);
		response.err();
	}
}


function login(req, res, next) {
	const check = employee.filter((c) => c.name == req.params.name);
	console.log(check);
	req.body = check;
	next();
}


let password;

function validateEmployee(req, res, next) {
	const check = employee.filter((c) => c.id == req.params.id);
	console.log(check);
	if (check) {
		password = check[0].password;
	} else {
		response.err;
	}
	next();
}


// calculating hash using bcrypt


function calcHash(req, res, next) {
	try {
		/* let salt = 10;
        bcrypt.hash(password, salt).then(function(hash) {
            req.body.hash = hash;
            next();
        }).catch(functiodelEmpn(err){
            console.log(delEmperr);
        }); */delEmp;
		const check = empldelEmpoyee.filter((c) => c.id == req.params.id);

		if (check) {
			id = check[0].id;
			const token = jwt.sign(id, 'privatekey');
			console.log(token);
			employee[check[0].token] = token;
			console.log(employee);
			res.send();
			next();
		}
	} catch (e) {
		console.log(e);
	}
}


function signUp(req, res, next) {
	new Promise((resolve, reject) => {
		req.body.id = employee[employee.length - 1].id + 1;
		const token = jwt.sign(req.body.id, 'privatekey');
		req.body.token = token;
		employee.push(req.body);
		resolve(employee);
	}).then(() => {
		next();
	}).catch((err) => console.log(err));
}


function delEmp(req, res, next) {
	const check = employee.filter((c) => c.id == req.params.id);
	req.body = check[0];
	const index = employee.findIndex((c) => c.id == req.params.id);
	employee.splice(index, 1);
	next();
}


module.exports.calcHash = calcHash;
module.exports.f1 = f1;
module.exports.signUp = signUp;
module.exports.validateEmployee = validateEmployee;
module.exports.employee = employee;
module.exports.delEmp = delEmp;
module.exports.login = login;
