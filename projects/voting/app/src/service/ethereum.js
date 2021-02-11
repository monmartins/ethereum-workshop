var Web3 = require('web3')
var solc = require('solc')
var config_data = require('../../config.json')
var path = require('path')
var fs = require('fs')

// const web3 = new Web3(
//     new Web3.providers.WebsocketProvider('ws://'+config_data.host),
// );  
  
// web3.eth.net.isListening()
// .then(() => {console.log('is connected');
// }).catch(e => console.log('Wow. Something went wrong: '+ e));


// const contractPath = path.resolve(__dirname, config_data.contract_folder,"Voter.sol");
// var contractSource = {'Voter':{content:fs.readFileSync(contractPath,'utf-8')}};
// let input = JSON.stringify({
//     language:'Solidity', 
//     sources: contractSource,
//     settings: {outputSelection:{
//         '*':{
//             '*': ['*']
//         }
//     }}
// })

// var contract = JSON.parse(solc.compile(input));

// contract = contract.contracts.Voter.Voter;

// (async () => {
//     accounts = await  web3.eth.getAccounts();

//     console.log(`Account ${accounts[0]}`)
//     console.log("password - "+config_data.password)
//     await web3.eth.personal.unlockAccount(accounts[0],config_data.password,1000);

//     console.log("Account unlocked")
//     deployedContract = await new web3.eth.Contract(contract.abi)
//     if(!config_data.contract_exist){
//         deployedContract = await new web3.eth.Contract(contract.abi)
//         .deploy({
//             data: '0x' + contract.evm.bytecode.object,
//             arguments: [['Cassandro', 'Megael', 'RiosT']]
//         }).send({
//             from: accounts[0],
//             gas: 15000999
//           }, function(error, transactionHash){ console.log("error_transactionHash"); console.log(error)})
//           .on('error', function(error){ console.log("error_error"); console.log(error) })
//           .on('transactionHash', function(transactionHash){ console.log("transactionHash"); console.log(transactionHash) })
//           .on('receipt', function(receipt){
//              console.log(receipt.contractAddress) 
//           })
//           console.log(deployedContract.options.address)
//     }
    

var receipt_global = false;
// })();

module.exports = {

    init: ()=>{
        this.web3 = new Web3( new Web3.providers.WebsocketProvider('ws://'+config_data.host) )
        this.contract = null
        this.accounts = null
        this.deployedContract = null
        this.addressContract = null


        var contractPath = path.resolve(__dirname, config_data.contract_folder,"Voter.sol");
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
        
        this.contract = JSON.parse(solc.compile(input));
        
        this.contract  = this.contract.contracts.Voter.Voter;
        
        (async () => {
            this.accounts = await  this.web3.eth.getAccounts();
        
            console.log(`Account ${this.accounts[0]}`)
            console.log("password - "+config_data.password)
            await this.web3.eth.personal.unlockAccount(this.accounts[0],config_data.password,1000);
        
            console.log("Account unlocked")
            
            // if(!config_data.contract_exist){
                var contractPath = path.resolve(__dirname,config_data.contract_folder,"./contract.json");
                fs.writeFileSync(contractPath,'{"address":"null"}')
                this.deployedContract = await new this.web3.eth.Contract(this.contract.abi)
                .deploy({
                    data: '0x' + this.contract.evm.bytecode.object,
                    arguments: [['Cassandro', 'Megael', 'RiosT']]
                }).send({
                    from: this.accounts[0],
                    gas: 15000999
                  }, function(error, transactionHash){ console.log("error_transactionHash"); console.log(error)})
                  .on('error', function(error){ console.log("error_error"); console.log(error) })
                  .on('transactionHash', function(transactionHash){ console.log("transactionHash"); console.log(transactionHash) })
                  fs.writeFileSync(contractPath,'{"address":"'+this.deployedContract.options.address+'"}')
            // }
            
        
        
        })();

    },
    query: async (req,res,next)=>{
        this.deployedContract = await new this.web3.eth.Contract(this.contract.abi)
        var contractPath = path.resolve(__dirname,config_data.contract_folder,"./contract.json");
        let addressContract = JSON.parse(fs.readFileSync(contractPath,'utf-8'))
        if(addressContract.address!="null" && this.deployedContract!=null && this.accounts!=null){
            this.deployedContract.options.address=addressContract.address
            const depContract =  this.deployedContract
            const account =  this.accounts[0]
            await depContract.methods.getOptions()
            .call({from:  account})
            .then(function(result_options){
                depContract.methods.getVotes()
                .call({from:  account})
                .then(function(result_votes){                
                    const candidates = [{Name:result_options[0], Votes:result_votes[0]},
                    {Name:result_options[1], Votes:result_votes[1]},
                    {Name:result_options[2], Votes:result_votes[2]}]
                    res.render('home', { candidates: candidates})
                })
            });
            
        }else{

            console.log("Contract is null or account is null")
        }
    },
    submitVote: async (req,res,next)=>{
        console.log(req.body.id)
        this.deployedContract = await new this.web3.eth.Contract(this.contract.abi)
        var contractPath = path.resolve(__dirname,config_data.contract_folder,"./contract.json");
        let addressContract = JSON.parse(fs.readFileSync(contractPath,'utf-8'))
        this.deployedContract.options.address=addressContract.address
        if(this.deployedContract.options.address!=null && this.deployedContract!=null && this.accounts!=null){
            const depContract =  this.deployedContract
            const account =  this.accounts[0]
            await depContract.methods.vote(req.body.id)
            .send({from:  account})
            .then(function(){
                res.redirect('/home')
                next();
            }).catch(function(error){
                console.log(error)
                res.redirect('/home')
                next();
            });
            
        }else{

            console.log("Contract is null or account is null")
        }
    }
}