/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/*
const express = require('express');
const app = express();

const employees = [
	{ title : "A", id : 0 },
	{ title : "B", id : 1 },
	{ title : "C", id : 2 },
	{ title : "D", id : 3 },
	{ title : "E", id : 4 }
	];

app.get('/', (req, res)=>{
	res.send('Welcome :) !!');
	});

app.get('/api/employees', (req, res)=>{
		res.send(employees);
});

app.post('/api/submit', (req,res)=>{
	res.send("Post Method");
});

app.put('/api/update/', (req,res)=>{
	res.send("Put Method");
});

app.delete('/api/delete/',(req,res)=>{
	res.send("Delete Method");
});       */

// //////////////

/*

const chkCode = {
	in : /^(\+){0,1}91[0-9]{10}/,
	au : /^(\+){0,1}61[0-9]{10}/,
	eu : /^(\+){0,1}49[0-9]{10}/,
}
function numberCheck(mobileNo, countryCode) {

	if (countryCode && mobileNo) {
		if(chkCode.hasOwnProperty(countryCode.toLowerCase())) {
			return chkCode[countryCode].test(mobileNo) ;
		}
	}
	return false ;
}
*/

// //////////////

// app.listen(3000,()=> console.log("waiting for action !!!!"));

/*
let fs = require('fs');                    // including the module "file system" in our module as fs

function makeFile(a){                           // a is number of file user wants to get created
	for(var i = 1;i <= a;i++){                  // check on number of files to create
		fs.open('file' + i,'w',(err)=>{        // create files, if its not present with the given name
			if(err) throw(err);                 // in case any exception occurs
		});
		const file = fs.createWriteStream('file'+ i);    // create a write stream to write data in file

		for(var j = 1;j <= 10;j++){           // write the given data till provided limit
			file.write("hey!!\nthere you go :)\n");              // data to be written
		}

		file.end();                             // end the write stream created for the particular file
	};
};

//makeFile(2);                  //calling the function with number of file to be made as an argument

function append_File(file, final){              //function that appends data of file to final file

	fs.readFile(file,(err, data)=>{             //reading the file, the data to be appended
		if(err) throw err;
		console.log(data.toString());

		fs.appendFile(final, file,(err)=>{
		if(err) throw err;
	})
	});
}


//storing file locations in variables

const file = "file1";
const final = "file2";

append_File(file,final);    // calling the append_file function

*/

// /////////////


/*
const os = require('os');
var totalMemory = os.totalmem();
var freeMemory = os.freemem();

console.log(`Total Memory: ${totalMemory}`);

console.log(`Free Memory: ${freeMemory}`);

*/

// ///////////

/*

const EventEmitter = require('events');

const Logger = require('./logger');
const logger = new Logger();

// lister for event 'message'
logger.on('message',(arg) => {
	console.log('listener called',arg);
});

const file_1 = require('./logger');

logger.log("hello");

*/


// /////////////

/*

const os = require('os');
const cluster = require('cluster');

if(cluster.isMaster){

	let cpuPro = os.cpus().length;
	//console.log(cpuPro);
	cpuPro.forEach((cpu, i)=>{
		let worker = cluster.fork();
		worker.on('exit',()=>{
			console.log("child processes made");
		});

	});

	cluster.on('exit',()=>{
		let activeWorker = Object.keys(cluster.workers).length;
		if(activeWorker == 0){
			console.log("Work Done!!!");
			process.exit();
		}
	});
}else {

	console.log("This is child process");
	process.exit();
}

*/

// ///////////////


/*
var cp = require('child_process');
var prog = {
	list:"ls",
	copy:"cp",
	folder:"mkdir"
}

var child = cp.spawn(prog.list);
child.stdout.on('data', (data)=>{
	console.log(`data:\n${data}`);
});

var copy = cp.spawn(prog.copy,['1stexp_server.js','allCode.js']);
child.on('exit', ()=>{
	console.log(`copy process finished!!`);
});

var makeDir = cp.spawn(prog.folder,["new"]); */


// /////////////////////////
// ////////////////////////


/*
// using the node.js built in cluster module
let cluster = require('cluster'),

// also using the node.js built in os (operating system) module
os = require('os'),

// I can get a list of the systems cpus like this:
cpus = os.cpus(),

// standard start message
startmess = function () {

    let pid = process.pid,
    processType = cluster.isMaster ? 'Master' : 'Worker',
    worker = cluster.worker || {
        id: 0
    };

    console.log(processType + ' started on pid: ' + pid + ' worker.id: ' + worker.id);

};

// if this is the master
if (cluster.isMaster) {

    startmess();

    // fork this script for each cpu
    let i = 0,
    len = cpus.length;
    while (i < len) {

        cluster.fork();

        i += 1;

    }

    // on exit
    cluster.on('exit', function (worker, code, sig) {

        console.log('he\'s dead Jim');
        console.log(worker.id);

    });

} else {

    // else it is a fork
    startmess();

    let c = 0,
    rate = 1000,
    lt = new Date(),
    worker = cluster.worker;

    // end process after 1 sec
    setInterval(function () {

        console.log('worker # : ' + worker.id + ' : ' + c);

        if (c === 10) {

            cluster.worker.kill();

        }

        c += 1;

    }, 100);

}

*/


// /////////////
// /////////////


const cluster = require('cluster');
const os = require('os');

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
	console.log('This is Master!!');

	// Fork workers.
	// eslint-disable-next-line no-plusplus
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker, code, signal) => {
		console.log(`worker ${worker.process.pid} died`);
	});
} else {
	console.log(`Worker ${process.pid} started`);
}


// //////////////
// //////////////
