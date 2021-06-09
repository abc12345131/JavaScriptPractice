#! /bin/bash
mongoimport --db react-app --collection users --drop --file mongoDB_file\users.json --jsonArray
mongoimport --db react-app --collection products --drop --file mongoDB_file\products.json --jsonArray
mongoimport --db react-app --collection roles --drop --file mongoDB_file\roles.json --jsonArray
mongoimport --db react-app --collection categories --drop --file mongoDB_file\categories.json --jsonArray
mongoimport --db react-app --collection categories --drop --file mongoDB_file\tasks.json --jsonArray