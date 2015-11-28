var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app); // http is a built-in module in express
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

// socket argument refers to the individual connection from a client
io.on('connection', function(socket) {


	socket.on('message', function(message) {
		console.log('Message received: ' + message.text);

		// this sends the message to every live connection BUT the sender of the message
		// use io.emit() to send the message to every connection including the sender
		socket.broadcast.emit('message', message);
	});

	socket.emit(
		// event - can be whatever you want
		'message',
		// the object is the payload to be sent
		{
			text: "Welcome to the chat application!"
		}
	)
});

http.listen(PORT, function() {
	console.log('Server started!');
})