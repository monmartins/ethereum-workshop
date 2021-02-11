export ACCOUNT_PASSWORD=01e3851d3b4c8ee05e2a7615aee40eb6903e2c0d88057376b0aef580f23f8f67
export SECRET=dae8405096dd3ef1b2580a1e382db3cf5a9d08c2b763a822531cca9943d60727
export CONTRACT_EXIST=0
export CONTRACT_ADRESS=0x021c71e08C17831194B6DCBfe017A0101d95BDeD

docker-compose -f docker-compose/docker-compose.yml down
rm -rf ./ethereum-config/bootnode ./ethereum-config/genesis.json ./ethereum-config/scripts/keystore  \
    ./ethereum-config/scripts/address ./ethereum-config/scripts/key ./ethereum-config/scripts/private_key.json\
    ./ethereum-config/scripts/account