# ethereum-workshop

**IMPORTANT NOTE FOR WINDOWS USERS:** You have to ensure that the scripts have Unix line endings or Docker won't be able to run them in the image. If you have modified the files on Windows, you can manually open the *.sh files with Sublime Text, go to the option VIEW->Line Endings-> UNIX and save the file. More informations in the [link](https://stackoverflow.com/questions/37419042/container-command-start-sh-not-found-or-does-not-exist-entrypoint-to-contain).

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
	docker-compose up --scale ethereum-node=3
```

## Using docker-compose.yml in network-public
```
	cd /network-public
	chmod 777 ./fulls/scripts/init.sh
	chmod 777 ./lights/scripts/init.sh
	chmod 777 ./miners/scripts/init.sh
	cd ..
	docker-compose up --d
```

## Connect to a running container
```
	docker exec -it <container name> /bin/sh
```

## Synchronization modes


	Sync modes
	You can start Geth in one of three different sync modes using the --syncmode "<mode>" argument that determines what sort of node it is in the network.

	These are:

	Full: Downloads all blocks (including headers, transactions, and receipts) and generates the state of the blockchain incrementally by executing every block.
	Fast (Default): Downloads all blocks (including headers, transactions and receipts), verifies all headers, and downloads the state and verifies it against the headers.
	Light: Downloads all block headers, block data, and verifies some randomly.
    


## Useful Links

[Run with docker](https://geth.ethereum.org/docs/install-and-build/installing-geth#run-inside-docker-container)

[Interface with javascript console](https://geth.ethereum.org/docs/interface/javascript-console)

[Setup a private network](https://geth.ethereum.org/docs/getting-started/private-net)

[Interface private network](https://geth.ethereum.org/docs/interface/private-network)

[RPC Server](https://geth.ethereum.org/docs/rpc/server)

[JSON RPC](https://eth.wiki/json-rpc/API)

[Useful PDF](https://ethereum-tests.readthedocs.io/_/downloads/en/develop/pdf)

[Tests](https://godoc.org/github.com/ethereum/go-ethereum/tests)
	


## Doc

### https://ethdocs.org/en/latest/
### https://ethereum.org/en/developers/docs/
### https://docs.soliditylang.org/en/v0.7.5/


## Demo Blockchain
### https://www.youtube.com/watch?v=_160oMzblY8