# Campfire

A Social Playlist Web Application where users create channels and others can tune in and contribute to the channel's playlist queue.

Name: Robert Choe, Sandro Brognara, TJ Shrestha

Date: 5/09/2019

Project Topic: Social Playist Creator

URL: 

--- https://umd-graveyard.herokuapp.com/


### 1. Data Format and Storage

Data point fields:
- `Field 1`:     Name       `Type: Number`
- `Field 2`:     genre       `Type: String`
- `Field 3`:     date_created       `Type: String`
- `Field 4`:     queue       `Type: String`
- `Field 6`:     active       `Type: Number`

Schema: 
```javascript
{
 var ChannelSchema = new Schema(
  {
    name: {type: String, required: true, max: 100},
    genre: {type: String, required: true, max: 100},
    date_created: {type: Date},
    queue: {type: Array, "default" : [], required: true},
    active: {type: Number}
  }
);
}
```

### 2. 
### 2. Add New Data

HTML form route: `/`

POST endpoint route: `/api/addItem`

Example Node.js POST request to endpoint: 
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'http://localhost:3000/api/...',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: { 
       id: 202,
       title: "lost iphone",
       description: "I phone an iphone on the bench in front of mckeldin mall",
       category: "phone",
       location_found: "in front of mckeldin mall",
       date_found: "05/02/2019"
    } 
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

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