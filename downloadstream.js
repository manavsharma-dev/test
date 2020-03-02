
const http = require('http');
const url = require('url');

const server = http.createServer((req,res)=>{

    res.writeHead(200,{"Content-Type" : "text/plain"});

    let reqUrl = url.parse(req.url,true);

    if(reqUrl.query.name){

        let name = reqUrl.query.name;
        console.log(name);
        res.write('Got That ...');
    }
res.end("It's Working :)");
});


server.listen(4000);