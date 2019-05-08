// define your endpoints in this file
var express = require('express');
var channelsRouter = express.Router();
var Channel = require('../../../models/channels')
var channel_controller = require('../../../controllers/channelController');

channelsRouter.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

channelsRouter.use('/', (req, res, next)=>{
  console.log("I run first before I retrieve all the tickets")
  next()
})

channelsRouter.use('/:channelId', (req, res, next) => {
  Channel.findById( req.params.channelId, (err,channel) => {
    if(err)
        res.status(500).send(err)
    else {
        // append to request object new property-value pair from db
        req.channel = channel;
        next()
    }
  })
})

channelsRouter.route('/')
  .get(channel_controller.retrieve_channels)  
  .post(ticket_controller.create_channel);


ticketsRouter.route('/:channelId/delete')
  .delete(ticket_controller.delete_channel)

module.exports = channelsRouter;