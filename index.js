require('dotenv').config()
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var exphbs = require('express-handlebars');
var _ = require('underscore');
var moment = require('moment');
var Channel = require('./models/channels');
require('dotenv').config()
const port = 3000;


//setting up express & handlebars

var app = express();


//setting up socket.io
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.engine('handlebars', exphbs({ defaultLayout: 'main', partialsDir: "views/partials/"}));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));




//setting up mongoose connection

const dbuser = process.env.CAMPFIREMONGODBUSER;
const dbpass = process.env.CAMPFIREMONGODBPASSWORD;
const uri = `mongodb+srv://${dbuser}:${dbpass}@cluster0-ipths.mongodb.net/test?retryWrites=true`;
mongoose.connect(uri, {useNewUrlParser: true, dbName: 'campfireDB'});
mongoose.connection.on('error', function() {
	console.log("Mongo db connect error");
	process.exit(1);
})


app.get('/',function(req,res){
	var ch = []

	// Callback function to wait for channel data from DB before rendering page
	function getChannelData(callback) {
		// Channel.find({},{"name":1, "_id":0}, function(err, channels) {
		Channel.find({}, function(err, channels) {
			if (err) { throw err };
			ch = channels;
			callback();
		});
	}
<<<<<<< HEAD
=======

app.post('/', function(req, res){
	var body = req.body;
	var videoURL = req.body.song;
>>>>>>> MVCUpdate
	
	// check if the videoURL exists, then extract the video paramter and construct an embeded video link
	if (videoURL != '') {
		var param = videoURL.split('v=')[1];
		videoURL = "https://www.youtube.com/embed/" + param;
	}
	var new_channel = new Channel({
		name: body.name,
		genre: body.genre,
		date_created: Date.now(),
		queue: [videoURL],
		current_song: videoURL
	});
	new_channel.save(function err(){
		if(err) { console.log("ERROR") }
	});
	res.redirect('/show');
});
	
getChannelData(function(){
	res.render('home', {channels: ch});
});
});

app.post('/', function(req, res){
	var body = req.body;
	var videoURL = req.body.song;

// check if the videoURL exists, then extract the video paramter and construct an embeded video link
	if (videoURL != '') {
		var param = videoURL.split('v=')[1];
		videoURL = "https://www.youtube.com/embed/" + param;
	}

/*	let date = new Date(Date.now());
	let cur_date = date.getDate();
	let cur_month = date.getMonth();
	let cur_year = date.getFullYear();
	let dateStr = cur_date + "-" + (cur_month + 1) + "-" + cur_year; */

//	cur_date = moment(cur_date).format("YYYY-MM-DD");

	var new_channel = new Channel({
		name: body.name,
		genre: body.genre,
		date_created: Date.now(),
  	    //date_created: dateStr,
		queue: [videoURL],
		current_song: videoURL
	});
	new_channel.save(function err(){
		//if(err) { console.log("ERROR") }
	});
	res.redirect('/show');
});


app.get('/create', function(req, res) {
	res.render('create')
})

app.get('/channel/:name', function(req,res){
	var ch = {};
	var chCurrentSong = '';
	// Callback function to wait for channel data from DB before rendering page
	// Match :name parameter with a channel name, save that channel, and render the page with its data
	function getChannelData(callback) {
		Channel.find({name: req.params.name}, function(err, channel){
			if (err) { throw err; }
			ch = channel;
			chCurrentSong = channel.current_song;
			callback();
		});
	}

	// This post method adds a song to the channel's queue
app.post('/channel/:name', function(req, res){
	var channelName = req.params.name;
	var videoURL = req.body.song;
	var goBack = '/channel/' + channelName;
	var channel = {};
	if (videoURL != '') {
		var param = videoURL.split('v=')[1];
		videoURL = "https://www.youtube.com/embed/" + param;
		function findChannel(callback) {
			Channel.find({name: channelName}, function(err, ch){
				if (err) { throw err; }
				channel = ch[0];
				callback();
			})
		}
		findChannel(function(){
			Channel.update(				// use updateOne() because update() is deprecated?
				{_id: channel._id},
				{$push: {queue: videoURL} },
				function(err) {
					if (err) { console.log("ERROR") }
				}
			);
			res.redirect(goBack); 		// Add an acknowledgement that the song was added successfully
		});
	} else {
		res.redirect(goBack); 		// Display error to user saying why song url was invlaid
	}
});

getChannelData(function(){
	res.render('channel-page', {channel: ch, current_song: chCurrentSong});
});
});

app.get('/show', function(req, res){
	Channel.find({}, function(err, channels) {
		if (err) { throw err };
		res.render('show', {ch: JSON.stringify(channels, null, 2)});
	});
}) 

//TODO
app.get('/filter', function(req, res) {
	res.render('filter');
})

//TODO
app.get('/filter/recent', function(req, res) {
	var ch = []

	// Callback function to wait for channel data from DB before rendering page
	function getChannelData(callback) {
		// Channel.find({},{"name":1, "_id":0}, function(err, channels) {
		Channel.find({}, function(err, channels) {
			if (err) { throw err };
			ch = channels;
			callback();
		});
	}
	
	getChannelData(function(){
		ch = _.filter(ch, function(channel) {
			let one_day = 24 * 60 * 60 * 1000;
			let cur_date = new Date(Date.now());
			let channel_date = new Date(channel.date_created);
			let days_diff = Math.round(Math.abs((cur_date.getTime() - channel_date.getTime())/(one_day)));
			console.log("Cur date: " + cur_date);
			console.log("Channel Date: " + channel_date);
			console.log("Difference: " + days_difference);			
		});		
		res.render('recent', {

			channels: ch
		});
	});

//	res.render('recent');
})

//TODO
app.get('/filter/popular', function(req, res) {
	var ch = []

	// Callback function to wait for channel data from DB before rendering page
	function getChannelData(callback) {
		// Channel.find({},{"name":1, "_id":0}, function(err, channels) {
		Channel.find({}, function(err, channels) {
			if (err) { throw err };
			ch = channels;
			callback();
		});
	}

	getChannelData(function(){
		res.render('popular', {channels: ch});
	});
	//res.render('popular');
})

//TODO
app.get('/about', function(req, res) {
	res.render('about');
})

