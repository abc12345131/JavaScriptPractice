#! /bin/bash
mongoimport --uri "mongodb://yourusername:yourpassword@localhost:27017/react-app?authSource=admin" --collection users --drop --file users.json --jsonArray;
mongoimport --uri "mongodb://yourusername:yourpassword@localhost:27017/react-app?authSource=admin" --collection messages --drop --file messages.json --jsonArray;