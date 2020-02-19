/*
const express = require('express'); 
const app = express();
const bodyParser = require('body-parser'); 

const func = require('./services/functions');
const response = require('./services/response');

app.use(bodyParser.json());

app.get('/allemp',(req,res)=>{
    res.send(func.employee);
});

app.get('/fact/:no', func.f1, response.success);

app.post('/auth/:id', func.validateEmployee, func.calcHash, response.doneHashing);

app.post('/signup',func.signUp, response.doneSingUp);

app.get('/login/:name', func.login, response.loginDone);

app.delete('/del/:id', func.delEmp, response.deletedEmp);

app.listen(4000,()=>{
    console.log("Listening.....");
});

*/

///////////






const eventEmitter = require('events');
const emitter = new eventEmitter();
const fs = require('fs');                        // including the module "file system" in our module as fs


function makeFile(a){                           // a is number of file user wants to get created
	for(var i = 1;i <= a;i++){                  // check on number of files to create
		fs.open('file' + i + '.txt','w',(err)=>{        // create files, if its not present with the given name
			if(err) throw(err);                 // in case any exception occurs
		});
		const file = fs.createWriteStream('file'+ i + '.txt');    // create a write stream to write data in file

		for(var j = 1;j <= 2.5e5;j++){           // write the given data till provided limit
			file.write("hey!!\n");              // data to be written
		}

		file.end();                             // end the write stream created for the particular file
	};
};

makeFile(2);                  //calling the function with number of file to be made as an argument


// creating writeStream for writing into destibation file
let stream1 = fs.createReadStream('./file1.txt');
let stream2 = fs.createReadStream('./file2.txt');
let writeStream = fs.createWriteStream('./final.txt');

stream1.on("data", function(data) {
    writeStream.write(data.toString());
});

stream2.on("data", function(data) {
    writeStream.write(data.toString());
});

emitter.emit("data");