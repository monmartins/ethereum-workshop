var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var path = require('path')

var config_data = require('./config.json')
config_data.password=process.env.ACCOUNT_PASSWORD 
config_data.contract_exist=process.env.CONTRACT_EXIST
config_data.contract_address=process.env.CONTRACT_ADDRESS

var eth = require('./src/service/ethereum')

var app = express();


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.set('views', path.join(__dirname, './src/views/'))
app.set('view engine', 'jade')
app.set('view options', { layout: true}); 


app.use(cors({credentials: true, origin: 'http://0.0.0.0:'+config_data.port}));



app.use('*', (req, res, next) => {
	// Logger
	let time = new Date()
	console.log(`${req.method} to ${req.originalUrl} at ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`)
	next()
})

eth.init(); //initialize ethereum
var routes = require('./src/routes/routes')(eth)
app.use('/', routes)
app.use(express.static('./src/public'));

app.listen(config_data.port, '0.0.0.0', (req, res) => {
	console.log(`Listening on localhost:${config_data.port}`)
})

