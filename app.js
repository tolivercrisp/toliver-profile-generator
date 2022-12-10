const inquirer = require("inquirer");
const fs = require("fs");

// An array to store the employee objects
const employees = [];

// Prompt the user for information about the team manager
function promptManager() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter the team manager's name:",
    },
    {
      type: "input",
      name: "id",
      message: "Enter the team manager's employee ID:",
    },
    {
      type: "input",
      name: "email",
      message: "Enter the team manager's email address:",
    },
    {
      type: "input",
      name: "officeNumber",
      message: "Enter the team manager's office number:",
    },
  ]);
}

function promptEngineer() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter the engineer's name:",
    },
    {
      type: "input",
      name: "id",
      message: "Enter the engineer's employee ID:",
    },
    {
      type: "input",
      name: "email",
      message: "Enter the engineer's email address:",
    },
    {
      type: "input",
      name: "github",
      message: "Enter the engineer's GitHub username:",
    },
  ]);
}

// Prompt the user for information about an intern
function promptIntern() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter the intern's name:",
    },
    {
      type: "input",
      name: "id",
      message: "Enter the intern's employee ID:",
    },
    {
      type: "input",
      name: "email",
      message: "Enter the intern's email address:",
    },
    {
      type: "input",
      name: "school",
      message: "Enter the intern's school:",
    },
  ]);
}

// Generate an HTML page that displays summaries for each employee
function generateHTML(employees) {
    var html = "<!DOCTYPE html>\n<html>\n<head>\n";
    html += "<title>Employee Summary</title>\n</head>\n<body>\n";
  
    employees.forEach((employee) => {
      html += "<h1>" + employee.name + "</h1>\n";
      html += "<p>ID: " + employee.id + "</p>\n";
      html += "<p>Email: " + employee.email + "</p>\n";
      if (employee.role === "Manager") {
        html += "<p>Office number: " + employee.officeNumber + "</p>\n";
      } else if (employee.role === "Engineer") {
        html += "<p>GitHub username: " + employee.github + "</p>\n";
      } else if (employee.role === "Intern") {
        html += "<p>School: " + employee.school + "</p>\n";
      }
    });

    html += "</body>\n</html>";
  
    // Write the HTML to a file
    fs.writeFile("employees.html", html, function (err) {
      if (err) {
        return console.log(err);
      }
  
      console.log("Employee summary generated successfully!");
    });
  }

  function promptUser() {
    return inquirer.prompt([
      {
        type: "list",
        name: "type",
        message: "What type of team member would you like to add?",
        choices: ["Engineer", "Intern", "I don't want to add any more team members"],
      },
    ]);
  }

  // Prompt the user for information about the team manager
  promptManager().then((manager) => {
  // Add the manager object to the array
  employees.push(manager);
  

  // Show the menu
    return inquirer.prompt([
      {
        type: "list",
        name: "type",
        message: "What type of team member would you like to add?",
        choices: ["Engineer", "Intern", "I don't want to add any more team members"],
      },
  ]).then((answer) => {
    if (answer.type === "Engineer") {
      // Prompt the user for information about the engineer
      promptEngineer().then((engineer) => {
        // Add the engineer object to the array
        employees.push(engineer);

        // Show the menu again
        promptUser();
      });
    } else if (answer.type === "Intern") {
      // Prompt the user for information about the intern
      promptIntern().then((intern) => {
        // Add the intern object to the array
        employees.push(intern);

        // Show the menu again
        promptUser();
      });
    } else {
      // If the user does not want to add any more team members, generate the HTML page
      generateHTML(employees);
    }
  });
});