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
    // db.collection('Todos').insertOne({
    //     text: 'Something!!',
    //     completed: false
    // }, function (err, result) {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    db.collection('Users').insertOne({
        name: 'Sudhir',
        age: 26,
        location: 'Richmond'
    }, function (err, result) {
        if (err) {
            return console.log('Unable to insert user data', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    client.close();
});