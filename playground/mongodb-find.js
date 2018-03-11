const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017/TodoApp';

// Connect using MongoClient
MongoClient.connect(url, function(err, client) {
    if(err) {
        return console.log(' unable to connect to mongodb server');
    }
    console.log('Connected to mongodb server!!');
    const db = client.db('TodoApp');
    db.collection('Todos').find({
        completed: false
    }).toArray().then(function (docs) {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, function (err) {
        console.log('Unable to fetch Todos');
    });

    db.collection('Users').find({
        name: 'Sudhir'
    }).toArray().then(function (docs) {
        console.log('Users');
        console.log(JSON.stringify(docs, undefined, 2));
    }, function (err) {
        console.log('Unable to fetch Users');
    });

    client.close();
});