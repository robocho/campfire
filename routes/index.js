var express = require('express');
var router = express.Router();
var Channel = require('../models/channels');

/* GET home page. */
router.get('/',function(req,res){
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

router.post('/', function(req, res){
	var body = req.body;
	var videoURL = req.body.song;
	
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
		current_song: videoURL,
		active: 0
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
router.get('/create', function(req, res) {
	res.render('create')
})

router.get('/channel/:id', function(req,res){
	var ch = {};
	var chCurrentSong = '';
	// Callback function to wait for channel data from DB before rendering page
	// Match :name parameter with a channel name, save that channel, and render the page with its data
	function getChannelData(callback) {
		Channel.find({_id: req.params.id}, function(err, channel){
			if (err) { throw err; }
			ch = channel[0];
			chCurrentSong = channel.current_song;
			callback();
		});
	}

	// This post method adds a song to the channel's queue
router.post('/channel/:name', function(req, res){
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

router.get('/show', function(req, res){
	Channel.find({}, function(err, channels) {
		if (err) { throw err };
		res.render('show', {ch: JSON.stringify(channels, null, 2)});
	});
}) 

//TODO
router.get('/filter', function(req, res) {
	res.render('filter');
})

//TODO
router.get('/filter/recent', function(req, res) {
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
			let cur_date = moment(Date.now()).format("YYYY-MM-DD");
		//	if cur_date.slice(0, 4) == channel.date_created.slice(0,4) && {

		//	}

			//if (channel.date_created )			
		});		
		res.render('recent', {

			channels: ch
		});
	});

//	res.render('recent');
})

//TODO
router.get('/filter/popular', function(req, res) {
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
router.get('/about', function(req, res) {
	res.render('about');
})

module.exports = router;
