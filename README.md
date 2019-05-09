# Campfire

A Social Playlist Web Application where users create channels and others can tune in and contribute to the channel's playlist queue.

Name: Robert Choe, Sandro Brognara, TJ Shrestha

Date: 5/09/2019

Project Topic: Social Playist Creator

URL: 

--- https://umd-graveyard.herokuapp.com/


### 1. Data Format and Storage

Three Schemas: 
```javascript
{
var SongSchema = new Schema(
  {
    mp3_link: {type: String, required: true},
  }
);
var CommentSchema = new Schema ({
  name: {type: String, required: true, max: 100},
  date_created: {type: Date},
  comment: {type: String, required: true, max: 400},
})


var ChannelSchema = new Schema(
  {
    name: {type: String, required: true, max: 100},
    genre: {type: String, required: true, max: 100},
    date_created: {type: Date},
    queue: [SongSchema], 
    active: {type: Number},
    comments: [CommentSchema]
  }
);

}
```

### 2. Live Updates

**Socket.io**:
    **Active Users**: Campfire uses socket.io to communicate how many active listeners are in each channel. This number of active listeners in each channel is displayed in the main table of the home page
    **Comments**: Campfire uses socket.io to communicate comments made in individual channels in real time
    **Playlist**: Campfire uses socket.io to allow users to add mp3 links to the channel's queue, and have that addition boradcasted to others listening in the channel

### 3. View Data
    Each page is generated using handlebars

### 4. API 

POST Endpoint - Create a new channel

```javascript
var options = { 
    method: 'POST',
    url: 'http://localhost:3000/api/v1/channels/...',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: { 
        name: {type: String, required: true, max: 100},
        genre: {type: String, required: true, max: 100},
        date_created: {type: Date},
        queue: [SongSchema], 
        active: {type: Number},
        comments: [CommentSchema]
    } 
};
```
DELETE Endpoint - Delete a channel
```javascript
var options = { 
    method: 'POST',
    url: 'http://localhost:3000/api/v1/channels/:channelId/delete...',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: { 
        id: {type: String, required: true, max: 100}
    } 
};
```

### 4. Modules 


### 5. NPM Packages
get-youtube-title
get-youtube-id

