const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = mongoose.connect('mongodb://localhost:27017/users', { useMongoClient: true });

const User = require('./users');

const addUser = (user) => {
   User.create(user).then(user => {
    console.info('new user added...');
    db.close();
  });
}

const findUser = (name) => {
  const search = new RegExp(name, 'i');
  User.find({$or: [{firstname: search}, {lastname: search}] }).then( user => {
      console.info(user);
      console.info(`${user.length} matches`);
      db.close();
    }
  );
}
const listUsers = () => {
  User.find({}).then( user => {
      console.info(user);
      console.info(`${user.length} users found`);
      db.close();
    }
  );
}

module.exports = { addUser, findUser, listUsers }
