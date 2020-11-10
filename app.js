const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

function promptUser(answers) {
  return inquirer
    .prompt([
      {
        message: "What is your role with the company?",
        name: "role",
        type: "list",
        choices: ["Engineer", "Intern", "Manager"],
      },
    ])
    .then(function (res) {
      console.log(res);
      if (res.role === "Engineer") {
        inquirer
          .prompt([
            {
              name: "name",
              message: "What is your name?",
              type: "input",
            },
            {
              name: "email",
              type: "input",
              message: "What is your email?",
            },
            {
              name: "github",
              type: "input",
              message: "What is your github Username?",
            },
          ])
          .then(function (engineerRes) {
            var newEngineer = new Engineer(
              engineerRes.name,
              engineerRes.email,
              uniqueId,
              engineerRes.github
            );
            uniqueId = uniqueId + 1;
            console.log(newEngineer);
            teamArray.push(newEngineer);
            addUser();
          });
      } else if (res.role === "Intern") {
        inquirer
          .prompt([
            {
              name: "name",
              message: "What is your name?",
              type: "input",
            },
            {
              name: "email",
              type: "input",
              message: "What is your email?",
            },
            {
              name: "school",
              type: "input",
              message: "Where did you graduate from college?",
            },
          ])
          .then(function (internRes) {
            var newIntern = new Intern(
              internRes.name,
              internRes.email,
              uniqueId,
              internRes.school
            );
            uniqueId = uniqueId + 1;
            console.log(newIntern);
            teamArray.push(newIntern);
            addUser();
          });
      } else if (res.role === "Manager") {
        inquirer
          .prompt([
            {
              name: "name",
              message: "What is your name?",
              type: "input",
            },
            {
              name: "email",
              type: "input",
              message: "What is your email?",
            },
            {
              name: "office",
              type: "input",
              message: "What is your office number?",
            },
          ])
          .then(function (managerRes) {
            var newManager = new Manager(
              managerRes.name,
              managerRes.email,
              uniqueId,
              managerRes.office
            );
            uniqueId = uniqueId + 1;
            console.log(newManager);
            teamArray.push(newManager);
            addUser();
          });
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
