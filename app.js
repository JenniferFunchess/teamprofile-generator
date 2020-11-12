const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
// const generateManager = renderFile.createManager;
// const generateEngineer = renderFile.createEngineer;
// const generateIntern = renderFile.createIntern;
// const renderHTML = renderFile.htmlRenderer.js;

const promptUser = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Name:",
        name: "name",
      },
      {
        type: "input",
        message: "Email:",
        name: "email",
      },
      {
        type: "list",
        name: "role",
        message: "What's Your Position At The Company?",
        choices: ["Manager", "Engineer", "Intern"],
      },
    ])
    .then(function (data) {
      switch (data.role) {
        case "Manager":
          inquirer
            .prompt([
              {
                type: "input",
                message: "Enter employee ID: ",
                name: "id",
              },
              {
                type: "input",
                message: "Enter office number: ",
                name: "office",
              },
            ])
            .then(function (res) {
              const officeNumber = res.office;
              const manager = new Manager(
                data.name,
                res.id,
                data.email,
                officeNumber,
                "Manager"
              );
              htmlRenderer(name, id, email, officeNumber);
              console.log(manager);
              employee.push(manager);
            })
            .then(function () {});
          break;
        case "Engineer":
          inquirer
            .prompt([
              {
                type: "input",
                message: "Enter employee ID: ",
                name: "id",
              },
              {
                type: "input",
                message: "Enter github username: ",
                name: "github",
              },
            ])
            .then(function (res) {
              const githubUsername = res.github;
              const engineer = new Engineer(
                data.name,
                res.id,
                data.email,
                githubUsername,
                "Engineer"
              );
              employees.push(engineer);
              htmlRenderer(name, id, email, officeNumber);
            })
            .then(function () {});
          break;
        case "Intern":
          inquirer
            .prompt([
              {
                type: "input",
                message: "Enter employee ID: ",
                name: "id",
              },
              {
                type: "input",
                message: "Enter school: ",
                name: "school",
              },
            ])
            .then(function (res) {
              const internSchool = res.school;
              const intern = new Intern(
                data.name,
                res.id,
                data.email,
                internSchool,
                "Intern"
              );
              employees.push(intern);
              htmlRenderer(name, id, email, school);
            })
            .then(function () {});
          break;
      }
    })
    .then(function () {});
};

const init = async () => {
  console.log("hi");
  try {
    const answers = await promptUser();

    const html = htmlRenderer(answers);

    await writeFileAsync("main", html);

    console.log("Success");
  } catch (err) {
    console.log(err);
  }
};

promptUser();
