// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/', function(req, res){
  var currentDate = new Date(); 
  res.json({
    unix: currentDate.getTime(),
    utc: currentDate.toUTCString()
  })
})

app.get('/api/:date?', function(req, res){
  var queryInput = req.params.date;  
  
  var date = new Date(queryInput);
  var dateFormat = new Date(+queryInput); 
  
  var dateString = new Date(queryInput);
  var dateUnix = new Date(dateString);

  dateUnixFormatted = parseInt(dateUnix.getTime());
  dateStringFormatted = dateString.toUTCString();

  var dateToMilliseconds =  date.getTime();
  var dateToUTC = date.toUTCString();
  
  if(date.toString() === "Invalid Date" && dateFormat.toString() === "Invalid Date" ){//check if invalid
    res.json({
      error: "Invalid Date"
    })
  }else if(queryInput.includes('-')){//check if its a date input
    res.json({
      unix: `${dateToMilliseconds}`,
      utc: `${dateToUTC}`
    });
  }else if(queryInput.includes(' ')){//check if it has space
    res.json({
      unix: dateUnixFormatted, //this was the biggest problem, i had to return it as an integer but using string litteral the return is always a string. ill never forget this problem EVER AGAIN. lol
      utc: `${dateStringFormatted}`
    });
  }else if(!isNaN(queryInput)){//check if is a number
    res.json({
      unix: dateFormat.getTime(),
      utc: dateFormat.toUTCString()
    })
  }
})
//needs refactory, but not now LUL
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
