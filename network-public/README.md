## Execute project

```
    docker network create ethereum_public 
    docker-compose scale ethereum-node-light=2 ethereum-node-full=2 ethereum-node-miner=4
```

