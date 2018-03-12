const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose')
const {Todo} = require('./models/todos');
const {User} = require('./models/users');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text,
        completed: req.body.completed,
        completedAt: req.body.completedAt
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, 
    (e) => {
        res.send(400).send(e);
    })
});

app.listen(3000, () =>{
    console.log('Connected to server on port 3000');
});