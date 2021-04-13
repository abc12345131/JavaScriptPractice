//1. import express
const express = require('express');

//2. creat express object
const app = express();

//3. setup routing rules
app.all('/server', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    response.send('HELLO AJAX');
});

//JSON response
app.all('/json-server', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    //response data
    const data = {
        name: 'wbl'
    };
    let str = JSON.stringify(data);
    response.send(str);
});

//response delay
app.all('/delay', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    setTimeout(() => {
        response.send('response delay');
    }, 2000)
});

//jsonp service
app.all('/jsonp-server',(request, response) => {
    const data = {
        name: 'wbl'
    };
    let str = JSON.stringify(data);
    response.end(`handle(${str})`);
});

//jquery jsonp service
app.all('/jquery-jsonp-server',(request, response) => {
    const data = {
        name:'wbl'
    };
    let str = JSON.stringify(data);
    //receive callback parameter
    let cb = request.query.callback;
    response.end(`${cb}(${str})`);
});

//cors
app.all('/cors-server', (request, response)=>{
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", '*');
    response.setHeader("Access-Control-Allow-Method", '*');
    // response.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    response.send('hello CORS');
});

//4. start server
app.listen(8000, () => {
    console.log("service started, listening port:8000");
});