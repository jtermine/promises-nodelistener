var context = require('rabbit.js').createContext('amqp://localhost:5672');

var port = process.argv[2] || 8080;


var req = context.socket('WORKER', {persistent: false});
// Piping into a SockJS socket means that our REQ socket is closed
// when the SockJS socket is, so there's no clean-up needed.
req.setEncoding('utf8');
req.connect('SomeQueue');

req.on('data', function(note) {

  var event = JSON.parse(note);

  if (event.header.eventId == 0) {
    console.log(event.body);
  }

  req.ack();
});