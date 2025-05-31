const http = require('http');
const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, './todoData.json');


const server = http.createServer((req, res) => {

    const url = new URL(req.url, `http://${req.headers.host}`)
    const pathName = url.pathname;

    // Get All Todos data
    if (pathName === '/all-todos' && req.method === 'GET') {
        const data = fs.readFileSync(dataFilePath, { encoding: 'utf-8' });
        res.writeHead(200, {
            "content-type": "application/json",
        });

        res.end(data);
    }

    // Post or create a Todo
    else if (pathName === '/create-todo' && req.method === 'POST') {

        let data = ""
        req.on("data", (chunk) => {
            data = data + chunk;
        });


        req.on("end", () => {
            console.log(data);
            const { title, body } = JSON.parse(data);

            const createdAt = new Date().toLocaleString();

            const allTodos = fs.readFileSync(dataFilePath, { encoding: 'utf-8' });
            const parsedAllTodos = JSON.parse(allTodos);

            parsedAllTodos.push({ title, body, createdAt });
            fs.writeFileSync(dataFilePath, JSON.stringify(parsedAllTodos, null, 2), { encoding: 'utf-8' });

            res.end(JSON.stringify({ title, body, createdAt }, null, 2))
        })

        res.end("ToDo Created Successfully");
    }

    // Get Single Data by Title.
    else if (pathName === '/todo' && req.method === 'GET') {
        const title = url.searchParams.get("title");
        const data = fs.readFileSync(dataFilePath, { encoding: 'utf-8' });
        const parsedData = JSON.parse(data);

        const todo = parsedData.find((todo) => todo.title === title);
        const stringifiedTodo = JSON.stringify(todo);

        res.writeHead(200, {
            "content-type": "application/json",
        });

        res.end(stringifiedTodo);
        // res.end('single data finding...')
    }

    // Update a Todo body
    else if (pathName === '/update-todo' && req.method === 'PATCH') {
        const title = url.searchParams.get("title");

        let data = ""
        req.on("data", (chunk) => {
            data = data + chunk;
        });


        req.on("end", () => {
            const { body } = JSON.parse(data);

            // const createdAt = new Date().toLocaleString();

            const allTodos = fs.readFileSync(dataFilePath, { encoding: 'utf-8' });
            const parsedAllTodos = JSON.parse(allTodos);

            const todoIndex = parsedAllTodos.findIndex((todo) => todo.title === title);

            parsedAllTodos[todoIndex].body = body

            fs.writeFileSync(dataFilePath, JSON.stringify(parsedAllTodos, null, 2), { encoding: 'utf-8' });

            res.end(JSON.stringify({ title, body, createdAt: parsedAllTodos[todoIndex].createdAt }, null, 2))
        })

        res.end("ToDo Updated Successfully");
    }
    
    else {
        res.end("404: Route Not Found");
    }
    // res.end('welcome to ToDo app server')
});





server.listen(5000, '127.0.0.1', () => {
    console.log('✅ Server listen to from ToDo')
})