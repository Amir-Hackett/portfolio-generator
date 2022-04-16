const inquirer = require('inquirer')
//lets us use the file system module
const fs = require('fs');
// imports from page-template js file
const generatePage = require('./src/page-template')

//creates questions for the user
const promptUser = () => {
// this creates the key value of the questions
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name? (Required)',
      validate: nameInput => {
        if (nameInput){
          return true
        } else {
          console.log('Please enter your name!')
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub Username? (Required)',
      validate: githubInput => {
        if (githubInput){
          return true
        } else {
          console.log('Please enter your GitHub Username!')
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Would you like to enter some information about yourself for an "About" section?',
      default: true
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:',
      // when is like a validation but it passes an object 
      when: ({confirmAbout}) => {
        if(confirmAbout){
          return true;
        } else {
          return false;
        }
      }
    }
  ]);
};

//creates questions for the user
const promptProject = portfolioData => {
  console.log(`
=================
Add a New Project
=================
`);

// If there's no 'projects' array property, create one
if (!portfolioData.projects) {
  portfolioData.projects = [];
}

// this creates the key value of the questions
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project?'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project (Required)',
      validate: descInput => {
        if (descInput){
          return true
        } else {
          console.log('Please provide project description!')
          return false;
        }
      }
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with? (Check all that apply)',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter the GitHub link to your project. (Required)',
      validate: linkInput => {
        if (linkInput){
          return true
        } else {
          console.log('Please provide GitHub link!')
          return false;
        }
      } 
    },
    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false
    }
  ])
  // pushes the data into the empty array
  .then(projectData => {
    portfolioData.projects.push(projectData);
    if (projectData.confirmAddProject) {
      return promptProject(portfolioData);
    } else {
      return portfolioData;
    }
  });
};

// answers is the value of the key
promptUser()
  .then(promptProject)
  .then(portfolioData => {
    const pageHTML = generatePage(portfolioData)

    fs.writeFile('./index.html', pageHTML, err => {
       if (err) throw new Error(err)

    console.log('Page created! Check out index.html in this directory to see it!')
    })
  });