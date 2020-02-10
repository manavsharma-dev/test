
const EventEmitter = require('events');

var url = 'http://mylogger.io/log';


class Logger extends EventEmitter{
    log(message){
        console.log(message);

    this.emit('message', { id: 1, url:url});          // raise an event
 }
}

module.exports = Logger;       //making the log method acessible in other files


