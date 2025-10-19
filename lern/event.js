const EventEmitter = require('events');

class CelebrityEventEmitter extends EventEmitter {
    constructor() {
        super();
    }
}


const celebrity = new CelebrityEventEmitter();

//subscriber to celebrity
celebrity.on('appearance', (event) => {
    console.log(`Celebrity is making unexpected appearance at ${event.location} on ${event.date}`);
});
celebrity.on('scandal', (event) => {
    console.log(`Breaking News! Celebrity involved in a scandal: ${event.details}`);
});


//another subscriber to celebrity
celebrity.on('appearance', (event) => {
    console.log(`You can see Celebrity at ${event.location} on ${event.date}`);
});
celebrity.on('scandal', (event) => {
    console.log(`Celebrity scandal: ${event.details}`);
});

celebrity.emit('appearance', { location: 'Hollywood', date: '2024-07-15' });
celebrity.emit('scandal', { details: 'Caught in a controversial situation!' });

// 'Process' is  type of EventEmitter, which supported following life cycle events - beforeExit, exit, diconnect, message, multipleResolves, rejectionHandled, uncaughtException etc

