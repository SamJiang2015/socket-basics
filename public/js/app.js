var socket=io();

socket.on('connect', function () {
	console.log('connected to socket.io server');
});

// handles submitting of new message
var $form = jQuery('#message-form');
var $message_box = $form.find('input[name=message]');
var $log_box = $form.find('textarea[name=log]');

var message_log = '';

$form.on('submit', function(event) {
	event.preventDefault(); 

	socket.emit('message', {
		text: $message_box.val(),
		sender: 'client'
	});

	message_log += ('我: ' + $message_box.val() +'\n');

	$message_box.val('');
	$log_box.val(message_log);

});

socket.on('message', function(message) {
	console.log('New message: ' + message.text);

	var prefix = '';
	if (message.sender === 'server') {
		prefix = '服务器';
	} else if (message.sender === 'client') {
		prefix = '对方';
	} else {
		prefix = '未知';
	}

	message_log += (prefix +': ' + message.text +'\n');

	$log_box.val(message_log);

});
