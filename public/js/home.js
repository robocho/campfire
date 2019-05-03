
var socket = io();
socket.on('new listener', function(name) {
    console.log(`new listner in channel: ${name}`);
    var num = parseInt(document.getElementById("active").innerHTML); 
    console.log(num)
    num += 1;
    socket.emit('current listeners', num)
     console.log(num)
    document.getElementById("active").innerHTML = num
});

socket.on('disconnected user', function(msg){
    var num = parseInt(document.getElementById("active").innerHTML); 
    console.log(num)
    num -= 1;
    socket.emit('current listeners', num)
     console.log(num)
    document.getElementById("active").innerHTML = num
 })

$(document).ready(function(){
	console.log("page loaded");
	socket.emit('home page loaded');
	
});

socket.on('get active listeners', function(num) {
	document.getElementById("active").innerHTML = num
})