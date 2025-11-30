const http = require('https') // require('http')
const fakeRequest = require('./request');
const fakeResponse = require('./response');

fakeReq = fakeRequest.send('Hello World! This is a test message.');
// console.log(faceResponse.receive(fakeReq)); 

const req = http.request('https://www.google.com', (res) => {
    let data = '';
    // res is of type IncomingMessage which is extending EventEmitter class
    res.on('data', (chunk) => {
        data += chunk;
        // console.log(`${chunk}`); // chunk is Buffer type
    });

    res.on('end', () => { // no more data from request
        // console.log('no more data');
    });
}).on('error', (err) => {
    console.error(`Error in accessing google website: ${err.message}`);
});

req.end(); // if this is not called, then the request to google will block and no response will be received


const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!\n');
});

const PORT = 3000;
const HOSTNAME = 'icecreamserver.local';

server.listen(PORT, HOSTNAME, () => {
    // console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
}).on('error', (err) => {
    console.error(`Error in starting server: ${err.message}`);
});

// To test the server, open browser and navigate to http://icecreamserver.local:3000/
// You should see "Hello, World!" displayed in the browser.  