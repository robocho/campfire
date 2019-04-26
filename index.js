require('dotenv').config()
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var exphbs = require('express-handlebars');
var _ = require("underscore");
var Channel = require('./models/channels');
const port = 3000;

//setting up express & handlebars

var app = express();
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

	app.post('/', function(req, res){
		var body = req.body;
		var videoURL = req.body.song;
		
		// check if the videoURL exists, then extract the video paramter and construct an embeded video link
		// set autoplay=1 parameter to play video on page load
		if (videoURL != '') {
			var param = videoURL.split('v=')[1];
			videoURL = "https://www.youtube.com/embed/" + param + "?autoplay=1";
		}

		var new_channel = new Channel({
			name: body.name,
			genre: body.genre,
			date_created: Date.now(),
			queue: [videoURL],
			current_song: ''
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

app.get('/channel/:name', function(req,res){
	var ch = {};
	// Callback function to wait for channel data from DB before rendering page
	// Match :name parameter with a channel name, save that channel, and render the page with its data
	function getChannelData(callback) {
		Channel.find({name: req.params.name}, function(err, channel){
			if (err) { throw err; }
			ch = channel;
			callback();
		});
	}
	getChannelData(function(){
		res.render('channel-page', {channel: ch, current_song: ch[0].queue[0]});
	});
});

app.get('/show', function(req, res){
	Channel.find({}, function(err, channels) {
		if (err) { throw err };
		res.render('show', {ch: JSON.stringify(channels, null, 2)});
	});
}) 
app.listen(port, function() {
	console.log("listening on port 3000!");

});
