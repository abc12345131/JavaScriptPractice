const { response } = require('express');
const express=require('express')
const express = require('express');

const app = express();

app.get('/server',(request, response)=>{
    
    response.setHeader('Access-Control-Allow-Origin','*');

    response.send();
})

app.listen('8000',()=>{
    
})