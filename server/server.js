const {mongoose} = require('./db/mongoose')
const {Todo} = require('./models/todos');
const {User} = require('./models/users');

// const newTodo = new Todo({
//     text: 'Cook Dinner',
//     completed: false,
//     completedAt: 123
// });

// newTodo.save().then((doc) => {
//     console.log('Saved todo :', doc)
// },
// (e) => {
//     console.log('Unable to save todo', e);
// });

const newUser = new User({
    email: 'panda@test.com'
});

newUser.save().then( (doc) => {
    console.log('Saved user :', doc);
},
(e) => {
    console.log('Unable to save todo', e);
})