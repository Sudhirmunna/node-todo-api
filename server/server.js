const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todos');
const {User} = require('./models/users');
const {ObjectID} = require('mongodb');

const app = express();
const port = process.env.port || 3000;
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, 
    (e) => {
        res.sendStatus(400).send(e);
    }).catch((e) => res.status(400).send('unable to post todo'));
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }),
    (e) => {
        res.send(400).send(e);
    }
});

app.get('/todos/:id', (req, res) => {
    let todoId = req.params.id;
    if(!ObjectID.isValid(todoId)) {
        return res.status(404).send('Is not a valid Id');
    }
    Todo.findById(todoId).then((todo) => {
        if(!todo) {
            return res.status(404).send('Todo by Id not found');
        }
        res.send({todo});
    }).catch((e) => res.status(400).send('Todo by Id not found'));
    
})
app.listen(port, () =>{
    console.log(`Connected to server on port ${port}`);
});

module.exports = {app};