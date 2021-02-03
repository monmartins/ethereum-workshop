#!/bin/sh

geth --syncmode "fast" --allow-insecure-unlock  --mine --minerthreads=2 --ethash.dagdir $DAG_FOLDER --datadir $ETH_FOLDER --bootnodes $( cat $BOOTNODE_FOLDER/enode ) --networkid ${NETWORK_ID} --ws --ws.addr  0.0.0.0 --ws.port 8546 --ws.api db,eth,net,web3,personal  --ws.origins "*" --http  --http.addr 0.0.0.0 --http.api="eth,net,web3,personal,web3"  --verbosity 3 1> /var/log/geth 2> /var/log/geth
