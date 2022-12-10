const inquirer = require("inquirer");
const fs = require("fs");

// An array to store the employee objects
const employees = [];

// Prompt the user for information about each employee
function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter the employee's name:",
    },
    {
      type: "input",
      name: "role",
      message: "Enter the employee's role:",
    },
    {
        type: "input",
        name: "id",
        message: "Enter the employee's ID:",
    },
    {
      type: "input",
      name: "email",
      message: "Enter the employee's email address:",
    },
    {
      type: "input",
      name: "phone",
      message: "Enter the employee's phone number:",
    },
  ]);
}

// Generate an HTML page that displays summaries for each employee
function generateHTML(employees) {
    var html = "<!DOCTYPE html>\n<html>\n<head>\n";
    html += "<title>Employee Summary</title>\n</head>\n<body>\n";
  
    employees.forEach((employee) => {
      html += "<h1>" + employee.name + "</h1>\n";
      html += "<h2>Role: " + employee.role + "</h2>\n";
      html += "<p>ID: " + employee.id + "</p>\n";
      html += "<p>Email: " + employee.email + "</p>\n";
      html += "<p>Phone: " + employee.phone + "</p>\n";
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

  // Prompt the user for information about each employee
promptUser().then((answers) => {
  // Add the employee object to the array
  employees.push(answers);

  // Ask the user if they want to enter another employee
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "continue",
        message: "Do you want to enter another employee?",
      },
    ])
    .then((response) => {
      if (response.continue) {
        // If the user wants to enter another employee, prompt them again
        promptUser().then((answers) => {
          // Add the employee object to the array
          employees.push(answers);
          // Continue prompting the user until they are finished
        });
      } else {
        // If the user is finished, generate the HTML page
        generateHTML(employees);
      }
    });
});