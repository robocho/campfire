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

### 3. View Data

GET endpoint route:  
`/api/all` -> Returns all lost and found entries  
`/api/category/:category` -> Returns all lost and found entries under specified category  
`/api/date/:year/:month/:day` -> Returns all lost and found entries under specified date: Eg: (2019/12/20)  
`/api/date/:year/:month` -> Returns all lost and found entries under specified year and month: Eg: (2019/05)  
`/api/date/:year` -> Returns all lost and found entries under specified year: Eg: (2019)  

### 4. Search Data

Search Field: Title **or** Description

Searching data will filter out entries displaying entries with a "title" or "description" containing search value

### 5. Navigation Pages

Navigation Filters
1. Category Drop Down Menu -> `/category/:category`
    - All -> `/category/all`
    - Clothing -> `/category/clothing`
    - Headphones -> `/category/headphones`
    - Phone -> `/category/phone`
    - ID -> `/category/id`
    - Keys -> `/category/keys`
    - Wallet -> `/category/wallet`
    - Other Electronic -> `/category/other%20electronic`
    - Other -> `/category/other`
2. Date -> `/Date/:year/:month/:day  `
3. Most Recent -> `  /mostrecent`
4. Oldest -> `/oldest`