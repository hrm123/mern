const http  = require('http');
const url = require('url');

// are are using short form for writing server.on('request', (req,res) => {})
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true); // true to parse query string into an object
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;
    if (pathname === '/') {
        
        if (query.id === '1') {
            res.statusCode = 200;
            res.writeHead(200, {'Content-Type': 'application/json'});
            // JSON.stringify converts JSON into string
            res.end(JSON.stringify({ 
                message: 'Hello, JSON!'
            }));
        } else if (query.id === '2') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            
            // you could use res.write("<div>xyz</div") etc. multiple times before ending the response
            res.end('<html><body><h1>Hello, HTML!</h1></body></html>');
        } else{
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.statusCode = 200;
            res.end('Hello, World!\n');
        }
    }
    else {
        res.statusCode = 404;
        res.end('404 Not Found\n');
    }
    // note - browser renders the reponse from webserves accordingly based on the Content-Type header
    
});


const PORT = 3010;

server.listen(PORT, () => {
    // console.log(`Server running at http://localhost:3010`);
}); // 127.0.0.1 by default

// To run the server, use the command: node webserver/index.js
// http://localhost:3010, http://localhost:3010/json