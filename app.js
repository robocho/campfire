var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
var _ = require("underscore");
var Channel = require('./models/channels');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
require('dotenv').config()
const port = 3000;

var indexRouter = require('./routes/index');
var channelRouter = require('./routes/api/v1/channels')

//setting up express & handlebars

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//setting up socket.io

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.engine('handlebars', exphbs({ defaultLayout: 'main', partialsDir: "views/partials/", handlebars: allowInsecurePrototypeAccess(Handlebars)}));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

app.use('/', indexRouter);
app.use('/api/v1/channels', channelRouter);



Handlebars.registerHelper('dateFormat', require('handlebars-dateformat'));

//setting up mongoose connection

const dbuser = process.env.CAMPFIREMONGODBUSER;
const dbpass = process.env.CAMPFIREMONGODBPASSWORD;
const uri = "mongodb+srv://cmsc389k:cmsc389k@cluster0-n7nor.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(uri, {useNewUrlParser: true});

mongoose.connection.on('error', function() {
	console.log("Mongo db connect error");
})

http.listen(process.env.PORT || 3000, function() {
    console.log(process.env.PORT)
    console.log('app listening on port!');
});

io.on('connection', function(socket) {
    console.log("new connection");
    io.on('disconnect', function() {
            console.log('disconnected');
    });
    //this socket handles new listener in a channel -> updates database 
    socket.on('new listener', function(id) {
        io.emit('new listener', id);
        	
        console.log(`new listner in channel: ${id}`);
        Channel.find({_id: id}, function(err, channel){
            if (err) { throw err; }
            let ch = channel[0];
            Channel.findByIdAndUpdate(ch._id,{active: ch.active + 1},{new: true}, function(err, result){
                console.log("updating this id")
                if(err){
                    console.log('error in put');
                    console.log(err);
                }
            });
        });
    });
    //this socket handles disconnected listener in a channel -> updates database 
    socket.on('disconnected user', function(id){
        console.log(`listner disconnected in channel: ${id}`);
        io.emit('disconnected user', id);
        Channel.find({_id: id}, function(err, channel){
            if (err) { throw err; }
            let ch = channel[0];
            Channel.findByIdAndUpdate(ch._id,{active: ch.active - 1},{new: true}, function(err, result){
                console.log("updating this id")
                if(err){
                    console.log('error in put');
                    console.log(err);
                }
            });
        });
    })
});


