
var socket = io();
$(document).ready(function(){
	console.log("page loaded");
	socket.emit('home page loaded');
	
});
