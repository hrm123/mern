const model = require('../models/friends.model');

const friends = [
    { id: 0, name: 'Alice' },
    { id: 1, name: 'Bob' },
    { id: 2, name: 'Charlie' }
];


function getFriends(req, res){
    res.json(model);
}

function getFriend(req, res){
    const friend = model.find(f => f.id === Number(req.params.friendId));
    if(friend){
        res.status(200).json(friend);
    } else {
        res.status(404).json({'error': 'Friend Not Found\n'});
    }
}


function postFriend(req, res){
    const friendName= req.body.name;
    if(!friendName){
        return  res.status(400).json({ error: 'Name is required' });
    }
    const newFrnd = { id: model.length, name: req.body.name };
    model.push(newFrnd);
    // console.log(`Added new friend: ${friendName}`);
    res.status(201).json(newFrnd); // 201 Created
}


module.exports = {
    getFriends, getFriend, postFriend
};