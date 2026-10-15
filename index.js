// const http = require('http');
import http from 'http';



const server = http.createServer((req, res) => {
    const data = {
        message: "Hello",
        time: new Date().toISOString()
    } 

    res.setHeader(
        'Content-Type',
        'text/plain; charset=utf-8'
    )

    res.write('Hello, ')
    res.end('world!')
})

server.listen(3000);