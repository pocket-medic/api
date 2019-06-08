#!/bin/zsh

#set up alias because lazyness
alias fjs="npx @feathersjs/cli"

#pull mongo docker image
docker pull mongo

docker-compose up -d