require('dotenv').config()
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var _ = require("underscore");
const port = 3000;

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.engine('handlebars', exphbs({ defaultLayout: 'main', partialsDir: "views/partials/"}));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));



//setting up mongo connection

const MongoClient = require("mongodb").MongoClient;
//environment variables
const dbuser = process.env.CAMPFIREMONGODBUSER
const dbpass = process.env.CAMPFIREMONGODBPASSWORD
const uri = `mongodb+srv://${dbuser}:${dbpass}@cluster0-ipths.mongodb.net/test?retryWrites=true`;
const client = new MongoClient(uri, { useNewUrlParser: true });
let database;
let collection;



client.connect((err, client) => {
	if(err) {
		console.log(err)
		return;
	}
	database = client.db("campfire"); //database name
  	collection = database.collection("data"); //collection name
  	console.log("connected to database sucessful")

});

app.get('/',function(req,res){

  console.log("connected")
});
app.listen(port, function() {
	console.log("listening on port 3000!");

	
});
