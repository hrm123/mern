const express = require('express')
// const friends = require('../models/friends.model');
const friendsController = require('../controllers/friends.controller');

const friendsRouter = express.Router();

friendsRouter.use((req, res, next) => { // logs the time each request took in the Express server
    const start = Date.now(); // cuttent time in milliseconds since Jan 1, 1970
    /*
    res.on('finish', () => {
        const duration = Date.now() - start;
        // console.log(`${req.method} ${req.url} - ${duration}ms`);
    });
    */
    next();
    const duration = Date.now() - start;
    // console.log(`${req.method} ${req.baseUrl}${req.url} - ${duration}ms`);
});

friendsRouter.use(express.json());
friendsRouter.use((req, res, next) => { // logs the time each request took in the Express server
    // console.log(req.ip)
    next();
  
});

friendsRouter.get('/', friendsController.getFriends);
friendsRouter.get('/:friendId',friendsController.getFriend);
friendsRouter.post('/', friendsController.postFriend);

module.exports = friendsRouter;