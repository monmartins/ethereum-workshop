#!/bin/sh
rm -rf $BOOTNODE_FOLDER/enode

mkdir -p $BOOTNODE_FOLDER

mkdir -p $DAG_FOLDER

mkdir -p  $ETH_FOLDER


echo $ACCOUNT_PASSWORD > password.txt
geth --datadir $ETH_FOLDER --password password.txt account new > account
cp account ${SCRIPT_FOLDER}/account
echo 'Account created'

#GET KEY
echo $(cat `pwd`/account | grep 'key file:' | cut -d ':' -f2) > ${SCRIPT_FOLDER}/key

#GET KEYSTORE
rm -rf ${SCRIPT_FOLDER}/keystore
mkdir -p ${SCRIPT_FOLDER}/keystore
cp -r $(cat ${SCRIPT_FOLDER}/key)  ${SCRIPT_FOLDER}/keystore


#GET PRIVATE KEY
cat $(cat ${SCRIPT_FOLDER}/key)  > ${SCRIPT_FOLDER}/private_key.json
echo $(cat `pwd`/account | grep 'the key:' | cut -d ':' -f2 | xargs) > ${SCRIPT_FOLDER}/address
export MYACCOUNT=$(cat ${SCRIPT_FOLDER}/address)
echo 'Keys storage'


genesis=$(cat $GENESIS_FILE_TEMPLATE | sed "s/\$MYACCOUNT/${MYACCOUNT}/")
echo $genesis > $GENESIS_FILE

geth --datadir $ETH_FOLDER init $GENESIS_FILE
echo 'Genesis init'

if [ -s $BOOTNODE_FOLDER/enode ]; 
then
    echo 'bootnode is done'
else
    bootnode --genkey boot.key
    bootnode --nodekey boot.key --addr :8009 1> enode 2> log &
    while [ ! -s enode ]; do
        echo 'Wait enode' > /tmp/enode
    done
    
    enode_boot=$(cat enode | grep enode )
    ip_container=$(ip a | awk '/inet/{i++}i==2' | cut -d ' ' -f6 | cut -d '/' -f1)
    enode_boot=$(echo $enode_boot | sed "s/127.0.0.1/${ip_container}/")
    echo $enode_boot > $BOOTNODE_FOLDER/enode
fi
echo 'Start geth'

sh -c '${SCRIPT_FOLDER}/geth.sh'
while true; do sleep 1000; done
# tmux