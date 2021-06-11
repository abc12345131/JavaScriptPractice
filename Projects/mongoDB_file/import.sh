#! /bin/bash
mongoimport --db react-app --collection users --drop --file users.json --jsonArray;
mongoimport --db react-app --collection products --drop --file products.json --jsonArray;
mongoimport --db react-app --collection roles --drop --file roles.json --jsonArray;
mongoimport --db react-app --collection categories --drop --file categories.json --jsonArray;
mongoimport --db react-app --collection work --drop --file work.json --jsonArray;