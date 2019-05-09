var Channel = require('../models/channels');

//retrieve all channles
exports.retrieve_channels = function(req, res) {
  Channel.find({}, (err, channels) => {
    res.json(channels)
  })
};
// Retrieve detail info for a specific Author.
exports.channel_detail = function(req, res) {
    Channel.findById(req.params.channelId, (err, channel) => {
      res.json(author)
      // when using middleware
      //res.json(req.author)
    }) 
};

//POST 
exports.create_channel = function(req, res) {
  let channel = new Channel(req.body); 
  //Need this for persistance
  channel.save();
  res.status(201).send(channel) 
};

//DELETE
exports.delete_channel = function(req, res) {
  Channel.findById(req.params.channelId, (err, author) => {
    // with middleware
    //  req.author.remove(err => {
    author.remove(err => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(204).send('removed')
        }
    })
  })
};
