//https://gist.github.com/AbhinavMadahar/0e99739343573fa0b812
var flash = require('connect-flash')
var express = require('express')
var bodyParser = require('body-parser')
var http = require("http");
var cors = require('cors')
// var fs = require('fs')
var path = require('path')


require('./src/service/ethereum')

var app = express();
var http = require('http').Server(app);



var config_data = require('./config.json')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.set('views', path.join(__dirname, './src/views/'))
app.set('view engine', 'jade')
app.set('view options', { layout: true}); 

app.use(flash())

app.use(cors({credentials: true, origin: 'http://0.0.0.0:'+config_data.port}));



app.use('*', (req, res, next) => {
	// Logger
	let time = new Date()
	console.log(`${req.method} to ${req.originalUrl} at ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`)
	next()
})

app.use(express.static('./src/public'));

http.listen(config_data.port, '0.0.0.0', (req, res) => {
	console.log(`Listening on localhost:${config_data.port}`)
})

