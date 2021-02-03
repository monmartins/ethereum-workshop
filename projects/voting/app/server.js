//https://gist.github.com/AbhinavMadahar/0e99739343573fa0b812
var flash = require('connect-flash')
var express = require('express')
// var session = require('express-session')
var bodyParser = require('body-parser')
// var passport = require('passport')
var http = require("http");
var cors = require('cors')
// var fs = require('fs')
var path = require('path')

// var sessionConfig = require('./src/service/session.js')

// require('./src/service/database').initialize()
require('./src/service/ethereum')

var app = express();
var http = require('http').Server(app);
var socketio = require('socket.io')(http);


var config_data = require('./config.json')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.set('views', path.join(__dirname, './src/views/'))
app.set('view engine', 'jade')
app.set('view options', { layout: true}); 


// app.use(session(sessionConfig))
// // app.use(express.static(path.join(__dirname, 'public')))
// app.use(passport.initialize())
// app.use(passport.session())
// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
app.use(flash())
// app.use(cookieParser(sessionConfig))
app.use(cors({credentials: true, origin: 'http://0.0.0.0:'+config_data.port}));



app.use('*', (req, res, next) => {
	// Logger
	let time = new Date()
	console.log(`${req.method} to ${req.originalUrl} at ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`)
	next()
})
// app.use(cors());
// var routes = require('./src/routes/routes')(passport)
// app.use('/', routes)

//cp ./node_modules/socket.io-client/dist/socket.io.js ./src/public/
//cp ./node_modules/socket.io-client/dist/socket.io.js.map ./src/public/
app.use(express.static('./src/public'));

http.listen(config_data.port, '0.0.0.0', (req, res) => {
	console.log(`Listening on localhost:${config_data.port}`)
})

