var socket=io();

socket.on('connect', function () {
	console.log('connected to socket.io server');
});

// handles submitting of new message
var $form = jQuery('#message-form');
var $message_box = $form.find('input[name=message]');
var $log_box = jQuery('#messages');

var message_log = '';

$form.on('submit', function(event) {
	event.preventDefault(); 

	socket.emit('message', {
		text: $message_box.val(),
		sender: 'client'
	});

	message_log = ('<div id="me"><b>我</b>: ' + $message_box.val() +'</div>');

	$message_box.val('');
	$log_box.append(message_log);

});


socket.on('message', function(message) {
	console.log('New message: ' + message.text);

	var prefix = '';
	if (message.sender === 'server') {
		prefix = '<div id="server"><b>服务器</b>';
	} else if (message.sender === 'client') {
		prefix = '<div id="other"><b>对方</b>';
	} else {
		prefix = '<b>未知</b>';
	}

	message_log = (prefix +': ' + message.text +'</div>');

	$log_box.append(message_log);

});
