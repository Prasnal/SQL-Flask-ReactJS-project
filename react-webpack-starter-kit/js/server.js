// server.js
//'Access-Control-Allow-Origin': '*'
var express = require('express')
var path = require('path')
var compression = require('compression')

var app = express()

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.use(compression())
// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, '../dist')))

// send all requests to index.html so browserHistory in React Router works
app.get('*', function (req, res) {
  // and drop 'public' in the middle of here
  res.sendFile(path.join(__dirname, '../dist', 'index.html'))
})

var PORT = process.env.PORT || 5000
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})
