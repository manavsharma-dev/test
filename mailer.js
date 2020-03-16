
const nodemailer = require('nodemailer');

const jwt = require('jsonwebtoken');
const response = require('./dbResponse');
const db = require('./testdb');


require('dotenv').config({ path: '/home/dell1/Desktop/app/.env' });


const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.username,
		pass: process.env.password,
	},
});


function checkEmail(req, res, next) {
	const obj1 = req.body;
	const token = jwt.sign(obj1, 'privatekey', { expiresIn: '1h' });

	const url = `http://192.168.1.7:3000/verify?token=${token}`;
	const mailOptios = {
		from: process.env.username,
		to: req.body.email,
		subject: ' Click below Link for Verification ',
		// eslint-disable-next-line no-multi-str
		text: `Hello!! \n This is your Verification link\n${url}`,
	};

	transporter.sendMail(mailOptios, (e, info) => {
		if (e) return e;

		if (info.response) {
			return next();
		}
		req.body.message = 'Invalid Email!!';
		return response.err(req, res);
	});
}


/*
To Verify User by sending email and a Verification Link
*/
async function verify(req, res) {
	const data = await jwt.decode(req.query.token);
	data.isverified = true;
	await db.testmodel.updateOne({ email: data.email }, { isverified: true });
	return res.send('THANKS FOR VERIFICATION ');
}


module.exports.verify = verify;
module.exports.checkEmail = checkEmail;
