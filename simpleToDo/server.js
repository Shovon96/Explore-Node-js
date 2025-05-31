const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    if(req.url === '/all-todos' && req.method === 'GET'){
        res.end("Get All ToDo Data");
    }else if (req.url === '/create-todo' && req.method === 'POST'){
        res.end("ToDo Created Successfully");
    }else {
        res.end("404: Route Not Found");
    }
    res.end('welcome to ToDo app server')
});





server.listen(5000, '127.0.0.1', () => {
    console.log('✅ Server listen to from ToDo')
})