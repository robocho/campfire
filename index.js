require('dotenv').config()
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var exphbs = require('express-handlebars');
var _ = require("underscore");
var Channel = require('./models/channels');
const port = 3000;

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
	var new_channel = new Channel({name: "my channel", genre: "pop",date_created: Date.now(), queue: ["www.youtube.com/dasd", "www.youtube.com/dasd"]});
	new_channel.save(function(err){
		if(err) {
			console.log("ERROR")
			
		}
		console.log("wowHO")
	})
	//collection.insertOne(new_channel)
	//console.log(Channel.findOne());
	res.render('home');
});

app.get('/:channel_name', function(req, res){

	
}) 
app.listen(port, function() {
	console.log("listening on port 3000!");

	
});
