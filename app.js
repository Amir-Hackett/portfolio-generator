const fs = require('fs');
const generatePage = require('./src/page-template')
//process is a global object that represents everything going on with this particular app
//argv property of process is an array that holds exactly what was typed into the command line upon execution
const profileDataArgs = process.argv.slice(2);

const [name, github] = profileDataArgs;

fs.writeFile('./index.html', generatePage(name, github), err => {
  if (err) throw new Error(err);

  console.log('Portfolio complete! Check out index.html to see the output!');
});

