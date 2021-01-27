#!/bin/bash
cd ..
docker-compose down --remove-orphans --volumes
rm -rf ./bootnode/enode
