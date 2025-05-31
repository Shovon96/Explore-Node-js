const http = require('http');
const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, './todoData.json');


const server = http.createServer((req, res) => {

    // Get All Todos data
    if (req.url === '/all-todos' && req.method === 'GET') {
        const data = fs.readFileSync(dataFilePath, { encoding: 'utf-8' });
        res.writeHead(200, {
            "content-type": "application/json",
        });

        res.end(data);
    }

    // Post or create a Todo
    else if (req.url === '/create-todo' && req.method === 'POST') {

        let data = ""
        req.on("data", (chunk) => {
            data = data + chunk;
        });


        req.on("end", () => {
            console.log(data);
            const { title, body } = JSON.parse(data);
            
            const createdAt = new Date().toLocaleString();

            const allTodos = fs.readFileSync(dataFilePath, {encoding: 'utf-8'});
            const parsedAllTodos = JSON.parse(allTodos);

            parsedAllTodos.push({title, body, createdAt});
            fs.writeFileSync(dataFilePath, JSON.stringify(parsedAllTodos, null, 2), {encoding: 'utf-8'});

            res.end(JSON.stringify({title, body, createdAt}, null, 2))
        })

        res.end("ToDo Created Successfully");
    }
    else {
        res.end("404: Route Not Found");
    }
    // res.end('welcome to ToDo app server')
});





server.listen(5000, '127.0.0.1', () => {
    console.log('✅ Server listen to from ToDo')
})