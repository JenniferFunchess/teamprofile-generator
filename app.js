const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employees = [];

const renderManager = (answers) => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is your name?",
      },
      {
        type: "number",
        name: "id",
        message: "What is your employee ID number?",
      },
      {
        type: "input",
        name: "email",
        message: "What is your email address?",
      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is your office number?",
      },
      {
        type: "validate",
        name: "addEmployee",
        message: "Would you like to add another employee??",
      },
    ])
    .then(function (managerAnswers) {
      const manager = new Manager(
        managerAnswers.name,
        managerAnswers.id,
        managerAnswers.email,
        managerAnswers.officeNumber
      );
      employees.push(manager);
      console.log(managerAnswers);
      if (managerAnswers.addEmployee === "y") {
        return newTeamMember();
      } else {
        return createHTML();
      }
    });
};

const newTeamMember = () => {
  const teamQuestion = [
    {
      type: "list",
      name: "createTeam",
      message: "Which team member do you want to add?",
      choices: ["Engineer", "Intern", "None"],
    },
  ];
  inquirer.prompt(teamQuestion).then((answers) => {
    if (answers.createTeam === "Engineer") createEngineer();
    else if (answers.createTeam === "Intern") createIntern();
    else {
      writeTeamPage(render(employees));
      console.log("Team Page Rendered!");
    }
  });
};

const createHTML = (userInput) => {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, (err) => {
      if (err) throw err;
    });
  }
  fs.writeFileSync(outputPath, render(userInput), (err) => {
    if (err) throw err;
  });
  console.log("You're team has been created!");
};

renderManager();
