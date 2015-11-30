var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var createBrowserHistory = require('history/lib/createBrowserHistory');

var ChatRoom = require('./chat-room');
var Main = require('./main');
var JoinChat = require('./join-chat');


ReactDOM.render((
	<Router history={createBrowserHistory()}>
		<Route path='/' component={Main}>
			<Route path='join' component={JoinChat} />
			<Route path='chatroom' component={ChatRoom} />
		</Route>
	</Router>),
	document.getElementById('app')
	);
