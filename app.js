const inquirer = require('inquirer')
// lets us use the file system module
// const fs = require('fs');
// // imports from page-template js file
// const generatePage = require('./src/page-template')

// const pageHTML = generatePage(name, github)

// fs.writeFile('./index.html', pageHTML, err => {
//   if (err) throw err;

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });

inquirer 
// this is the key of the questions
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?'
    }
  ])
    // answer is the value of the key
   .then(answers => console.log(answers))
