# ethereum-workshop


## Build Image
```
	cd docker/ethereum-go/
	docker build . -t golang-1-14-4:alpine
```

## Using docker-compose.yml in node-miner
```
	cd /node-miner/scripts
	chmod 777 ./init.sh
	cd ..
	docker-compose scale ethereum-node=3
```



### https://geth.ethereum.org/docs/install-and-build/installing-geth#run-inside-docker-container

### https://geth.ethereum.org/docs/interface/javascript-console

### https://geth.ethereum.org/docs/getting-started/private-net

### https://geth.ethereum.org/docs/rpc/server

### https://eth.wiki/json-rpc/API

### https://ethereum-tests.readthedocs.io/_/downloads/en/develop/pdf/

### https://geth.ethereum.org/docs/interface/private-network

### https://godoc.org/github.com/ethereum/go-ethereum/tests



```
	Sync modes
	You can start Geth in one of three different sync modes using the --syncmode "<mode>" argument that determines what sort of node it is in the network.

	These are:

	Full: Downloads all blocks (including headers, transactions, and receipts) and generates the state of the blockchain incrementally by executing every block.
	Fast (Default): Downloads all blocks (including headers, transactions and receipts), verifies all headers, and downloads the state and verifies it against the headers.
	Light: Downloads all block headers, block data, and verifies some randomly.
    
```

## Doc

### https://ethdocs.org/en/latest/
### https://ethereum.org/en/developers/docs/
### https://docs.soliditylang.org/en/v0.7.5/


## Demo Blockchain
### https://www.youtube.com/watch?v=_160oMzblY8