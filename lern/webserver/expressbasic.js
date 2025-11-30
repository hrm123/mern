const express = require('express');
const app = express();
const PORT = 3010;

const friends = [
    { id: 0, name: 'Alice' },
    { id: 1, name: 'Bob' },
    { id: 2, name: 'Charlie' }
];


app.use((req, res, next) => { // logs the time each request took in the Express server
    const start = Date.now(); // cuttent time in milliseconds since Jan 1, 1970
    /*
    res.on('finish', () => {
        const duration = Date.now() - start;
        // console.log(`${req.method} ${req.url} - ${duration}ms`);
    });
    */
    next();
    const duration = Date.now() - start;
    // console.log(`${req.method} ${req.url} - ${duration}ms`);
});


const bodyParser = express.json();
app.use(bodyParser); // creates req.body object


app.get('/', (req, res) => {
    res.status(200).type('text/plain').send('Hello, World!\n');
});

app.get('/friends', (req, res) => {
    // we could also simply write res.send(friends) & express auto adds the application/json response header and status 200
    res.status(200).json(friends);
});

app.get('/friends/:friendId', (req, res) => {
    const friend = friends.find(f => f.id === Number(req.params.friendId));
    if(friend){
        res.status(200).json(friend);
    } else {
        res.status(404).json({'error': 'Friend Not Found\n'});
    }
});

app.post('/friends', (req, res) => {
    // requires express.json() middleware to parse JSON body. It sends body to {} if no body was passed
    const friendName= req.body.name;
    if(!friendName){
        return  res.status(400).json({ error: 'Name is required' });
    }
    const newFrnd = { id: friends.length, name: req.body.name };
    friends.push(newFrnd);
    // console.log(`Added new friend: ${friendName}`);
    res.status(201).json(newFrnd); // 201 Created
});

app.listen(PORT, () => {
    // console.log(`Server running at http://localhost:${PORT}`);
}); 

// To run the server, use the command: node webserver/expressbasic.js

// http://localhost:3010/friends/10, http://localhost:3010/friends, http://localhost:3010/friends/0
// console logs request times

// GET /friends/10 - 10ms, GET /friends - 6ms, GET /friends/0 - 1ms - the times are fluctuating though on each refresh

//  request for success on post -  fetch('http://localhost:3010/friends', {method:'POST', body: JSON.stringify({name: 'newName'}), headers: { "Content-Type": "application/json"  },}).then((respons) => respons.json()).then((newfriend) => // console.log(newfriend))

// request for error on post -  fetch('http://localhost:3010/friends', {method:'POST', body: JSON.stringify({nameOfFriend: 'newName'}), headers: { "Content-Type": "application/json"  },}).then((respons) => respons.json()).then((newfriend) => // console.log(newfriend))