const inquirer = require("inquirer");
const fs = require("fs");

// Create an Employee class
class Employee {
  constructor(name, id, email, role = "Employee") {
    this.name = name;
    this.id = id;
    this.email = email;
    this.role = role;
  }

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }

  getEmail() {
    return this.email;
  }

  getRole() {
    return this.role;
  }
}

// Create a Manager class that extends Employee
class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email, "Manager");
    this.officeNumber = officeNumber;
  }

  getOfficeNumber() {
    return this.officeNumber;
  }
}

// Create an Engineer class that extends Employee
class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email, "Engineer");
    this.github = github;
  }

  getGithub() {
    return this.github;
  }
}

// Create an Intern class that extends Employee
class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email, "Intern");
    this.school = school;
  }

  getSchool() {
    return this.school;
  }
}

// Create an empty array to hold the team
const team = [];

// Prompt the user for the team manager's information
function promptManager() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the team manager's name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is the team manager's ID?",
      },
      {
        type: "input",
        name: "email",
        message: "What is the team manager's email?",
      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is the team manager's office number?",
      },
    ])
    .then((answers) => {
      // Create a new Manager object
      const manager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber
      );

      // Add the manager to the team
      team.push(manager);

      // Show the team menu
      showMenu();
    });
}

// Prompt the user for an engineer's information
function promptEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the engineer's name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is the engineer's ID?",
      },
      {
        type: "input",
        name: "email",
        message: "What is the engineer's email?",
      },
      {
        type: "input",
        name: "github",
        message: "What is the engineer's GitHub username?",
      },
    ])
    .then((answers) => {
      // Create a new Engineer object
      const engineer = new Engineer(
        answers.name,
        answers.id,
        answers.email,
        answers.github
      );

     // Add the engineer to the team
     team.push(engineer);

     // Show the team menu
     showMenu();
   });
}

// Prompt the user for an intern's information
function promptIntern() {
 inquirer
   .prompt([
     {
       type: "input",
       name: "name",
       message: "What is the intern's name?",
     },
     {
       type: "input",
       name: "id",
       message: "What is the intern's ID?",
     },
     {
       type: "input",
       name: "email",
       message: "What is the intern's email?",
     },
     {
       type: "input",
       name: "school",
       message: "What is the intern's school?",
     },
   ])
   .then((answers) => {
     // Create a new Intern object
     const intern = new Intern(
       answers.name,
       answers.id,
       answers.email,
       answers.school
     );

     // Add the intern to the team
     team.push(intern);

     // Show the team menu
     showMenu();
   });
}

// Show the team menu
function showMenu() {
 inquirer
   .prompt([
     {
       type: "list",
       name: "choice",
       message: "What would you like to do?",
       choices: [
         "Add an engineer",
         "Add an intern",
         "Finish building the team",
       ],
     },
   ])
   .then((answers) => {
     // Add an engineer
     if (answers.choice === "Add an engineer") {
       promptEngineer();
     }

     // Add an intern
     if (answers.choice === "Add an intern") {
       promptIntern();
     }

     // Finish building the team
     if (answers.choice === "Finish building the team") {
       generateHTML(team);
     }
   });
}

  // Generate an HTML page that displays summaries for each employee
  function generateHTML(employees) {
    var html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Employee Summary</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
      <style>
        body {
          background-color: lightblue;
        }
        .card {
          margin-top: 40px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h1 class="text-center mb-3">Employee Summary</h1>
            <div class="row">
              ${employees.map((employee) => `
                <div class="col-md-4">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">${employee.name}</h5>
                      <h6 class="card-subtitle mb-2 text-muted">${employee.role}</h6>
                      <p class="card-text">ID: ${employee.id}</p>
                      <p class="card-text">Email: ${employee.email}</p>
                      ${
                        employee.officeNumber
                          ? `<p class="card-text">Office Number: ${employee.officeNumber}</p>`
                          : ""
                     }
                      ${
                        employee.github
                          ? `<p class="card-text">GitHub: ${employee.github}</p>`
                          : ""
                      }
                      ${
                        employee.school
                          ? `<p class="card-text">School: ${employee.school}</p>`
                          : ""
                      }
                    </div>
                  </div>
                </div>
              `
              // Join the array of HTML strings into a single string
                ).join("")}

             
            </div>
          </div>
        </div>
      </div>
    </body>
  </html>
  `;

  // Write the HTML to a file
  fs.writeFile("./employees.html", html, function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
}

// Start the program
promptManager();

module.exports = Employee;
module.exports = Manager;
module.exports = Engineer;
module.exports = Intern;