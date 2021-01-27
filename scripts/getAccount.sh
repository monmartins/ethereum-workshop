#!/bin/bash
cd ..

rm -rf ../app/accounts
for value in  $(docker ps -qa)
do
    address=$(docker exec $value cat account  2>/dev/null ) 
    grep -q Public <<<"$address";
    if grep -q Public <<<"$address"; then    
        mkdir -p ../app/accounts
        echo 'ACCOUNT FOR '$value
        ip_container=$(docker exec $value ip a | awk '/inet/{i++}i==2' | cut -d ' ' -f6 | cut -d '/' -f1)
        echo $address >> ../app/accounts/$value
        echo $ip_container >> ../app/accounts/$value
    fi
done
