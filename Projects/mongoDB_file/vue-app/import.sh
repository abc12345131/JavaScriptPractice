#! /bin/bash
mongoimport --uri "mongodb://yourusername:yourpassword@localhost:27017/vue-app?authSource=admin" --collection goods --drop --file goods.json --jsonArray;
mongoimport --uri "mongodb://yourusername:yourpassword@localhost:27017/vue-app?authSource=admin" --collection ratings --drop --file ratings.json --jsonArray;
mongoimport --uri "mongodb://yourusername:yourpassword@localhost:27017/vue-app?authSource=admin" --collection categories --drop --file categories.json --jsonArray;