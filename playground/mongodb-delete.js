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
    // db.collection('Todos').deleteMany({
    //     completed: true
    // }).then(function (result) {
    //     console.log(result);
    // });
    // db.collection('Todos').deleteOne({
    //     completed: false
    // }).then(function (result) {
    //     console.log(result);
    // });
    // db.collection('Todos').findOneAndDelete({
    //     text : 'Drink!!'
    // }).then(function (result) {
    //     console.log(result);
    // });
    // db.collection('Users').deleteOne({
    //     name: 'Praneeth'
    // }).then(function (result) {
    //     console.log(result);
    // });
    db.collection('Users').findOneAndDelete({
        name: 'Sridhar'
    }).then(function (result) {
        console.log(result);
    });

    client.close();
});