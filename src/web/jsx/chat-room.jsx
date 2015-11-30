var React = require('react');

module.exports = React.createClass({
	
	render: function(){
		return (
			<div id="chat-room">
			    <div id="messages">
			    </div>
			    <form id="message-form">
			        <input id="message-box" name="message" placeholder="输入你的信息。。。" />
			        <button className="send-button btn btn-success" value="发送">发送</button>
			    </form>
			</div>
			);
	}	
})