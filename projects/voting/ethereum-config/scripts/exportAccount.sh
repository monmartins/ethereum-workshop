#!/bin/sh


kill -9 $(pgrep geth)
rm -rf $BACKUP_FOLDER
mkdir -p $BACKUP_FOLDER/myaccount
mkdir -p $BACKUP_FOLDER/dag
export ACCOUNT=$(cat ${SCRIPT_FOLDER}/key)
cp -r ${ACCOUNT} $BACKUP_FOLDER/myaccount/
cp -r $DAG_FOLDER  $BACKUP_FOLDER/dag
geth export --datadir $ETH_FOLDER $BACKUP_FOLDER/save_my_account
sh -c '${SCRIPT_FOLDER}/geth.sh'