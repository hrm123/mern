const http  = require('http');
const url = require('url');
const friends = [
        {id: 1, name: 'Alice'},
        {id: 2, name: 'Bob'},
        {id: 3, name: 'Charlie'}    
    ];

// are are using short form for writing server.on('request', (req,res) => {})
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true); // true to parse query string into an object
    const pathname = parsedUrl.pathname;
    const items = req.url.split('/');
    
    if(req.method === 'GET') { // note - browser renders the reponse from webserver accordingly based on the Content-Type header (html will be rendered as html, JSON will be displayed as JSOn etc)
        if(items.length > 1) {
            if (items[1] ===  'friends' ) {
                res.statusCode = 200;
                res.writeHead(200, {'Content-Type': 'application/json'});
                if(items.length === 3) {
                    const friendnum = Number(items[2]);
                    res.end(JSON.stringify(friends.findLast(f => f.id === friendnum) || {}));
                } else {
                    res.end(JSON.stringify(friends));
                }
            } else if (items[1] ===  'messages') {
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
    }
    else if(req.method === 'POST') {
        if(items.length > 1 && items[1] ===  'friends' ) {
            req.on('data', (data) => {
                const newFriend = JSON.parse(data);
                friends.push(newFriend);
                console.log(`Added new friend: ${newFriend.name}`);
            });
            /* altenative way
            req.on('end', () => {
                res.statusCode = 200;
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(friends));
            });
            */
           req.pipe(res); // no need to call res.end() here as pipe() will do it
        } else {
            res.statusCode = 404;
            res.end('404 Not Found\n');
        }
    }
    else {
        res.statusCode = 404;
        res.end('404 Not Found\n');
    }
    
    
});



const PORT = 3010;

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:3010`);
}); // 127.0.0.1 by default

// To run the server, use the command: node webserver/index.js
// http://localhost:3010, http://localhost:3010/json - GET
// fetch('http://localhost:3010/friends', { method: 'POST', body: JSON.stringify({ id:11, name: 'anonymous'}) }).then((respons) => respons.json()).then((newfriend) => console.log(newfriend))

