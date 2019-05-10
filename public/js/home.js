
var socket = io();
$(document).ready(function(){
	console.log("page loaded");
	socket.emit('home page loaded');
	
});
/*
$('#search-element').on('input', function(e){
  var input = $(e.target).val();
  if (input === '') {
    $('.entry').show();
  } else {
    $('.entry').hide();
      $('.entry').each(function(){
        var channelName = $(this).attr('id');
        var re = new RegExp("^"+input,"g");
        if (channelName.match(re)) {
            $(this).show();
        }
    });
  }
});
*/
$("#search-element").on("change paste keyup select", function(e){
	var input = $(e.target).val();
	if (input === '') {
    $('.entry').show();
  } else {
    $('.entry').hide();
      $('.entry').each(function(){
        var channelName = $(this).attr('id');
        var re = new RegExp("^"+input,"g");
        if (channelName.match(re)) {
            $(this).show();
        }
    });
  }
});
