const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017/TodoApp';

// Connect using MongoClient
MongoClient.connect(url, function (err, client) {
    if (err) {
        return console.log(' unable to connect to mongodb server');
    }
    console.log('Connected to mongodb server!!');
    const db = client.db('TodoApp');
    db.collection('Users').findOneAndUpdate({
        name: 'Sudhir'
    },
        {
            $set: {
                name: 'Sudhir Kumar'
            }
        },
        {
            returnOriginal: false
        }
    ).then(function (result) {
        console.log(result);
    });

    client.close();
});