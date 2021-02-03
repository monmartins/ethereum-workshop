#!/bin/sh
# import [command options] [arguments...]

#     geth account import <keyfile>

# Imports an unencrypted private key from <keyfile> and creates a new account.
# Prints the address.

# The keyfile is assumed to contain an unencrypted private key in hexadecimal format.

# The account is saved in encrypted format, you are prompted for a password.

# You must remember this password to unlock your account in the future.

# For non-interactive use the password can be specified with the -password flag:

#     geth account import [options] <keyfile>

# Note:
# As you can directly copy your encrypted accounts to another ethereum instance,
# this import mechanism is not needed when you transfer an account between
# nodes.


# ETHEREUM OPTIONS:
#                                       --datadir value                       Data directory for the databases and keystore (default: "/root/.ethereum")
#                                       --keystore value                      Directory for the keystore (default = inside the datadir)
#                                       --lightkdf                            Reduce key-derivation RAM & CPU usage at some expense of KDF strength

# ACCOUNT OPTIONS:
#                                       --password value                      Password file to use for non-interactive password input

kill -9 $(pgrep geth)
rm -rf $ETH_FOLDER
mkdir -p  $ETH_FOLDER

# get address 
# echo $(cat `pwd`/account | grep 'the key:' | cut -d ':' -f2 | xargs) > ${SCRIPT_FOLDER}/address
export MYACCOUNT="0x7D1aC232886702A9CD561bd75b2D4D4cf550E747" ## TODO 
echo 'Keys storage'
genesis=$(cat $GENESIS_FILE_TEMPLATE | sed "s/\$MYACCOUNT/${MYACCOUNT}/")
echo $genesis > $GENESIS_FILE

#


geth --datadir $ETH_FOLDER init $GENESIS_FILE

export KEY_FILE=$(ls ${BACKUP_FOLDER}/myaccount/*)
# geth account import --datadir $ETH_FOLDER --password password.txt $KEY_FILE
cp $KEY_FILE $ETH_FOLDER/keystore
echo $KEY_FILE >  ${SCRIPT_FOLDER}/key

geth import  --datadir $ETH_FOLDER $BACKUP_FOLDER/save_my_account

cp -r $BACKUP_FOLDER/dag/.ethash/*  $DAG_FOLDER

##
# rm -rf $BACKUP_FOLDER
# mkdir -p $BACKUP_FOLDER/myaccount
# mkdir -p $BACKUP_FOLDER/dag
##

sh -c '${SCRIPT_FOLDER}/geth.sh'