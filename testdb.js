/* eslint-disable consistent-return */

/*

*This contains the database connection specification

*@author Manav Sharma
*since Monday, March 2, 2020

*/


const mongoose = require('mongoose');

const mongoDBURL = process.env.mongoURL;

// mongo "mongodb+srv://cluster1-learn-mzwyn.mongodb.net/test"  --username Manav

try {
	mongoose.connect(mongoDBURL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	});
} catch (e) {
	return (e);
}


// eslint-disable-next-line no-console
mongoose.connection.on('connected', () => console.log('Connection established'));
// eslint-disable-next-line no-console
mongoose.connection.on('disconnected', () => console.log('Connection disconnected'));

const { Schema } = mongoose;

const modelSchema = new Schema({

	firstName: String,
	age: String,
	email: { type: String, unique: true },
	password: String,
	isverified: { type: Boolean, default: false },
	verfToken: { type: String, unique: true },
	city: { type: String, required: true },
});

const testmodel = mongoose.model('demo', modelSchema);

module.exports.testmodel = testmodel;
