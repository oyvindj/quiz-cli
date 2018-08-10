const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = mongoose.connect('mongodb://localhost:27017/users', {useNewUrlParser: true});

const User = require('./users');

const addUser = (user) => {
   User.create(user).then(user => {
    console.info('new user added...');
    mongoose.connection.close();
  });
}

const findUser = (name) => {
  const search = new RegExp(name, 'i');
  User.find({$or: [{firstname: search}, {lastname: search}] }).then( user => {
      console.info(user);
      console.info(`${user.length} matches`);
      mongoose.connection.close();
    }
  );
}
const listUsers = () => {
  User.find({}).then( user => {
      user.forEach(u => console.log('firstname: ' + u.firstname));
      console.info(`${user.length} users found`);
      mongoose.connection.close();
    }
  ).catch(err => console.log('error: ' + err));
}

module.exports = { addUser, findUser, listUsers }
