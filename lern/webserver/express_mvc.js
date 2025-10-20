const express = require('express');
const app = express();
const PORT = 3010;

const friendsController = require('./controllers/friends.controller');
const messagesController = require('./controllers/messages.controller');


app.use((req, res, next) => { // logs the time each request took in the Express server
    const start = Date.now(); // cuttent time in milliseconds since Jan 1, 1970
    /*
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`${req.method} ${req.url} - ${duration}ms`);
    });
    */
    next();
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} - ${duration}ms`);
});


const bodyParser = express.json();
app.use(bodyParser); // creates req.body object


app.get('/', (req, res) => {
    res.status(200).type('text/plain').send('Hello, World!\n');
});

app.get('/friends', friendsController.getFriends);

app.get('/friends/:friendId',friendsController.getFriend);

app.post('/friends', friendsController.postFriend);

app.get('/messages', messagesController.getMessages);
app.post('/messages', messagesController.postMessages);


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
}); 

// To run the server, use the command: node webserver/expressbasic.js

// http://localhost:3010/friends/10, http://localhost:3010/friends, http://localhost:3010/friends/0
// console logs request times

// GET /friends/10 - 10ms, GET /friends - 6ms, GET /friends/0 - 1ms - the times are fluctuating though on each refresh

//  request for success on post -  fetch('http://localhost:3010/friends', {method:'POST', body: JSON.stringify({name: 'newName'}), headers: { "Content-Type": "application/json"  },}).then((respons) => respons.json()).then((newfriend) => console.log(newfriend))

// request for error on post -  fetch('http://localhost:3010/friends', {method:'POST', body: JSON.stringify({nameOfFriend: 'newName'}), headers: { "Content-Type": "application/json"  },}).then((respons) => respons.json()).then((newfriend) => console.log(newfriend))