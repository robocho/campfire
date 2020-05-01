var express = require('express');
var router = express.Router();
var Channel = require('../models/channels');

var _ = require('underscore');

var Song = require('../models/song')
var Comment = require('../models/comment')

var getYoutubeTitle = require('get-youtube-title')


/* GET home page. */
router.get('/',function(req,res){
	var ch = []

	Channel.find({}, function(err,channels) {
		if (err) { throw err };
		res.render('home', {channels: channels})
		
	});
	/*
	// Callback function to wait for channel data from DB before rendering page
	function getChannelData(callback) {
		// Channel.find({},{"name":1, "_id":0}, function(err, channels) {
		Channel.find({}, function(err, channels) {
			if (err) { throw err };
			ch = channels;
			callback();
		});
	*/
	});

router.post('/', function(req, res){
	var body = req.body;
	var videoURL = req.body.song;
	
	// check if the videoURL exists, then extract the video paramter and construct an embeded video link
	async function getTitle() {
		var title = "";
		if (videoURL != '') {
			var param = videoURL.split('v=')[1];
			videoURL = "https://www.youtube.com/embed/" + param;
		}

		let promise = new Promise((resolve, reject) => {
    		getYoutubeTitle(param, function (err, t) {
  				resolve(t)
			})
  		});

  		title = await promise;

  		var new_song = new Song({title: title, mp3_link: videoURL});

		var new_channel = new Channel({
			name: body.name,
			genre: body.genre,
			date_created: Date.now(),
			queue: [new_song],
			current_song: videoURL,
			active: 0,
			comments: []
		});
		new_channel.save(function err(){
			if(err) { console.log("ERROR") }
		});


		res.redirect('/channel/'+ new_channel._id);
	}
	
	getTitle()

	/*
	var new_song = new Song({title: title, mp3_link: videoURL});

	var new_channel = new Channel({
		name: body.name,
		genre: body.genre,
		date_created: Date.now(),
		queue: [new_song],
		current_song: videoURL,
		active: 0,
		comments: []
	});
	new_channel.save(function err(){
		if(err) { console.log("ERROR") }
	});
	res.redirect('/');
	*/
});
/*	
getChannelData(function(){
	res.render('home', {channels: ch});
	});
});
*/
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
router.post('/channel/:id', function(req, res){
	var channelID = req.params.id;
	var videoURL = req.body.song;
	var goBack = '/channel/' + channelID;
	var channel = {};
	async function getTitle() {
		
		if (videoURL != '') {
			var param = videoURL.split('v=')[1];
			videoURL = "https://www.youtube.com/embed/" + param;
		function findChannel(callback) {
			Channel.find({_id: channelID}, function(err, ch){
				if (err) { throw err; }
				channel = ch[0];
				callback();
			})
		}
			let promise = new Promise((resolve, reject) => {
			getYoutubeTitle(param, function (err, t) {
					resolve(t)
				})
			});


		var title = await promise;
			var new_song = new Song({title: title, mp3_link: videoURL});
			findChannel(function(){
				Channel.update(				// use updateOne() because update() is deprecated?
					{_id: channelID},
					{$push: {queue: new_song} },
					function(err) {
						if (err) { console.log("ERROR") }
					}
				);
				res.redirect(goBack); 		// Add an acknowledgement that the song was added successfully
			});
		} else {
			res.redirect(goBack); 	
		}
	}

	getTitle()
});
		
		
getChannelData(function(){
	res.render('channel-page', {channel: ch, current_song: chCurrentSong});
	});
});

router.post('/channel/comment/:id', function(req, res){
	var channelID = req.params.id;
	var name = req.body.name;
	var comment = req.body.comment;
	var goBack = '/channel/' + channelID;
	let today = new Date(Date.now());
	var channel = {};

	if (name === '') {
		name = 'Anonymous';
	}

	if (comment != '') {
		function findChannel(callback) {
			Channel.find({_id: channelID}, function(err, ch){
				if (err) { throw err; }
				channel = ch[0];
				callback();
			})
		}

		findChannel(function(){

			var newComment = new Comment({
				name: name,
				date_created: today,
				comment: comment,
				channelID: channelID
			});

			Channel.update(				// use updateOne() because update() is deprecated?
				{_id: channelID},
				{$push: {comments: newComment} },
				function(err) {
					if (err) { console.log("ERROR") }
				}
			);
			res.redirect(goBack);
		});

	} else {
		res.redirect(goBack);
	}

});

router.get('/show', function(req, res){
	Channel.find({}, function(err, channels) {
		if (err) { throw err };
		res.render('show', {ch: JSON.stringify(channels, null, 2)});
	});
}) 

router.get('/filter', function(req, res) {
	res.render('filter');
})

router.get('/filter/exactdate', function(req, res) {
	var ch = [];
	function getChannelData(callback) {
		// Channel.find({},{"name":1, "_id":0}, function(err, channels) {
		Channel.find({}, function(err, channels) {
			if (err) { throw err };
			ch = channels;
			callback();
		});
	}

	getChannelData(function(){
		res.render('exactdate', {
			channels: ch
		});
	});
})

router.get('/filter/recentweek', function(req, res) {
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
			
			if (days_diff < 7) return true   //last two weeks
			else return false		
		});		

		ch = _.sortBy(ch, function(a, b) {
			let a_date = new Date(a.date_created);
			let b_date = new Date(b.date_created);
			return a_date.getTime() - b_date.getTime();
		});

		ch = ch.reverse();
		res.render('recentweek', {
			channels: ch
		});
	});
})

router.get('/filter/recentmonth', function(req, res) {
	var ch = []

	// Callback function to wait for channel data from DB before rendering page
	function getChannelData(callback) {
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
			
			if (days_diff <= 30) return true   //last two weeks
			else return false		
		});		

		ch = _.sortBy(ch, function(a, b) {
			let a_date = new Date(a.date_created);
			let b_date = new Date(b.date_created);
			return a_date.getTime() - b_date.getTime();
		});

		ch = ch.reverse();

		res.render('recentmonth', {
			channels: ch
		});
	});
})

//TODO
router.get('/filter/mostpopular/:num', function(req, res) {
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
			if (channel.active && channel.active >= req.params.num) return true
			else false 
		});		

		ch = _.sortBy(ch, function(a, b) {
			return a.active - b.active;
		});

		ch = ch.reverse();

		res.render('popular', {
			channels: ch
		});
	});
})

//TODO
router.get('/about', function(req, res) {
	res.render('about');
})

module.exports = router;
