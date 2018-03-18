require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todos');
const {User} = require('./models/users');
const {authenticate} = require('./middleware/authenticate');

const app = express();
const port = process.env.PORT || 3000;
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
    
});

app.delete('/todos/:id', (req, res) => {
    let id = req.params.id;
  
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
  
    Todo.findByIdAndRemove(id).then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
  
      res.send(todo);
    }).catch((e) => {
      res.status(400).send();
    });
});

app.patch('/todos/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['text', 'completed']);
  
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
  
    if (_.isBoolean(body.completed) && body.completed) {
      body.completedAt = new Date().getTime();
    } else {
      body.completed = false;
      body.completedAt = null;
    }
  
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
  
      res.send({todo});
    }).catch((e) => {
      res.status(400).send();
    })
})

app.post('/users', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);
    let user = new User(body);

    user.save().then(() => {
        return user.generateAuthTokens();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => res.status(400).send('unable to post todo'));
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});
  
app.listen(port, () =>{
    console.log(`Connected to server on port ${port}`);
});

module.exports = {app};