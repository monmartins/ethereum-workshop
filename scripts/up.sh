#!/bin/bash
cd ..

docker-compose up  --scale ethereum-node=1 -d

