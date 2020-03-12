/* eslint-disable consistent-return */
const mongoose = require('mongoose');

const mongoDBURL = 'mongodb+srv://Manav:manav123@cluster1-learn-mzwyn.mongodb.net/testdb';

// mongo "mongodb+srv://cluster1-learn-mzwyn.mongodb.net/test"  --username Manav

try {
	mongoose.connect(mongoDBURL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
} catch (e) {
	return (e);
}


mongoose.connection.on('connected', () => 'Connection established');
mongoose.connection.on('disconnected', () => 'Connection disconnected');

const schema = mongoose.Schema;
// eslint-disable-next-line new-cap
const modelSchema = new schema({

	firstName: String,
	age: Number,
	email: String,
	password: String,
});

const testmodel = mongoose.model('demo', modelSchema);

module.exports.testmodel = testmodel;
