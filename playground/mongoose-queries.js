const {ObjectID} =require('mongodb');
const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todos');
const {User} = require('../server/models/users');

let todoId = '5aa71b82e203271345e9f04a';
let userId = '5aa5adcfe24333fa2c0a269a';

if(!ObjectID.isValid(todoId)) {
    console.log('Id not valid');
}
// gets document array
Todo.find({
    _id: todoId
}).then((todos) => {
    console.log('Todos ', todos)
});
// gets document
Todo.findOne({
    _id: todoId
}).then((todo) => {
    console.log('Todo ', todo)
});

Todo.findById(todoId).then((todo) => {
    if(!todo) {
        return console.log('Todo by Id not found');
    }
    console.log('Todo by Id', todo);
}).catch((e) => console.log(e));

User.findById(userId).then((user) => {
    if(!user) {
        return console.log('User by Id not found');
    }
    console.log('User by Id', JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));