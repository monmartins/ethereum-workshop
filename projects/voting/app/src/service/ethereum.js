var Web3 = require('web3')
var solc = require('solc')
var config_data = require('../../config.json')
var path = require('path')
var fs = require('fs')

const web3 = new Web3(
new Web3.providers.WebsocketProvider('ws://'+config_data.host),
);  
  
web3.eth.net.isListening()
.then(() => {console.log('is connected');
}).catch(e => console.log('Wow. Something went wrong: '+ e));
