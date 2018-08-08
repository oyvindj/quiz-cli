const commander = require('commander');
const {prompt} = require('inquirer');

const {addUser, findUser, listUsers} = require('./index');

const questions = [
  { type: 'input', name: 'firstname', message: 'Last name'},
  { type: 'input', name: 'lastname', message: 'First name'},
  { type: 'input', name: 'email', message: 'Email'},
  { type: 'input', name: 'mobile', message: 'Phone'}
]

commander.version('1.0.0').description('User management system')

commander.command('add').alias('a').description('add user').action(() => prompt(questions).then(answers => addUser(answers)));
commander.command('list').alias('l').description('list users').action( () => { 
  console.info('user list...');
  listUsers();
}
);

commander.parse(process.argv);

