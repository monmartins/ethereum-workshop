#!/bin/sh
cd ..

mkdir -p  /home/dev

echo $PASSWORD_ACCOUNT > password.txt
geth --datadir /home/dev --password password.txt account new > account

geth --datadir /home/dev  init /home/dev/genesis.json

if [ -s /home/bootnode/enode ]; 
then
    echo 'bootnode is done'
else
    bootnode --genkey boot.key
    bootnode --nodekey boot.key --addr :8009 1> enode 2> log &
    while [ ! -s enode ]; do
        echo 'Wait enode'
    done
    
    enode_boot=$(cat enode | grep enode )
    ip_container=$(ip a | awk '/inet/{i++}i==2' | cut -d ' ' -f6 | cut -d '/' -f1)
    enode_boot=$(echo $enode_boot | sed "s/127.0.0.1/${ip_container}/")
    echo $enode_boot > /home/bootnode/enode
fi
geth --syncmode "fast" --datadir /home/dev --bootnodes $( cat /home/bootnode/enode ) --networkid ${NETWORK_ID} --mine --minerthreads=4 --ws --ws.addr  0.0.0.0 --ws.port 8546 --ws.api db,eth,net,web3,personal --rpc  --rpcaddr 0.0.0.0 --rpcapi="db,eth,net,web3,personal,web3"

# tmux