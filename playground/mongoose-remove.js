const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');
const {User} = require('./../server/models/users');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove
// Todo.findByIdAndRemove

// Todo.findOneAndRemove({_id: '5aa73efb4e15954df2ff4fde'}).then((todo) => {
//
// });

Todo.findByIdAndRemove('5aa73efb4e15954df2ff4fde').then((todo) => {
  console.log(todo);
});
