
const express = require('express');

const app = express();
const bodyParser = require('body-parser');

// An object with member's data

const m = [
	{ id: 1, name: 'abc' },
	{ id: 2, name: 'def' },
	{ id: 3, name: 'ghi' },
	{ id: 4, name: 'jkl' },
];

// http route(endpoint)
app.get('/', (req, res) => {
	res.send(' Welcome ');
});

app.get('/m ', (req, res) => {
	res.send(m);
});

app.get('/member/:id', (req, res) => {
	const member = m.find((c) => c.id === parseInt(req.params.id));
	if (!member) res.status(404).send('ID not found !!!');
	res.send(member);
});

app.use(bodyParser.json());


app.post('/add_member', (req, res) => {
	console.log(req.body);
	const member = {
		id: m.length + 1,
		name: req.body.name,
	};
	m.push(member);
	res.send(m);
});

app.delete('/del_mem/:id', (req, res) => {
	const member = m.find((c) => c.id === parseInt(req.params.id));
	if (!member) res.status(404).send('Not Found !!!');
	const index = m.indexOf(member);
	m.splice(index, 2);
	res.send(m);
});

app.put('/update_mem/:id', (req, res) => {
	const mb = m.find((c) => c.id === parseInt(req.params.id));
	const index = m.indexOf(mb);

	m[index].name = req.body.name;

	res.send(m);
});


app.listen(4000, () => {
	console.log('Listening ....');
});
