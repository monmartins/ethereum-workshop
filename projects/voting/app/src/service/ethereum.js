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


const contractPath = path.resolve(__dirname, config_data.contract_folder,"Voter.sol");
var contractSource = {'Voter':{content:fs.readFileSync(contractPath,'utf-8')}};
let input = JSON.stringify({
    language:'Solidity', 
    sources: contractSource,
    settings: {outputSelection:{
        '*':{
            '*': ['*']
        }
    }}
})

let contract = JSON.parse(solc.compile(input));

contract = contract.contracts.Voter.Voter;

(async () => {
    const accounts = await  web3.eth.getAccounts();

    console.log(`Account ${accounts[0]}`)

    await web3.eth.personal.unlockAccount(accounts[0],config_data.password,1000);

    console.log("Account unlocked")

    const deployedContract = await new web3.eth.Contract(contract.abi)
    .deploy({
        data: '0x' + contract.evm.bytecode.object,
        arguments: [['Miguel', 'Igor', 'Alex']]
    }).send({
        from: accounts[0],
        gas: 15000999//await web3.eth.estimateGas({to:accounts[0],data: '0x' + contract.evm.bytecode.object})
      }, function(error, transactionHash){ console.log("error1"); console.log(error)})
      .on('error', function(error){ console.log("error2"); console.log(error) })
      .on('transactionHash', function(transactionHash){ console.log("transactionHash"); console.log(transactionHash) })
      .on('receipt', function(receipt){
         console.log(receipt.contractAddress) // contains the new contract address
      })
    //   .on('confirmation', function(confirmationNumber, receipt){ console.log("confirmation"); console.log(confirmationNumber); console.log(receipt) })
        // .then(function(newContractInstance){
        //     console.log(newContractInstance.options.address) // instance with the new contract address
        // });

      console.log(await web3.eth.estimateGas({to:accounts[0],data: '0x' + contract.evm.bytecode.object}))

      console.log(deployedContract.options.address)


})();