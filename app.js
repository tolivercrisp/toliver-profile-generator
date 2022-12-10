const inquirer = require("inquirer");
const fs = require("fs");

// An array to store the employee objects
const employees = [];

// Show the menu
function showMenu() {
  inquirer.prompt([
    {
      type: "list",
      name: "type",
      message: "What type of team member would you like to add?",
      choices: ["Manager", "Engineer", "Intern", "I don't want to add any more team members"],
    },
  ]).then((answer) => {
    if (answer.type === "Manager") {
      // Prompt the user for information about the team manager
      promptManager().then((manager) => {
        // Add the manager object to the array
        employees.push(manager);

        // Show the menu again
        showMenu();
      });
    } else if (answer.type === "Engineer") {
      // Prompt the user for information about the engineer
      promptEngineer().then((engineer) => {
        // Add the engineer object to the array
        employees.push(engineer);

        // Show the menu again
        showMenu();
      });
    } else if (answer.type === "Intern") {
      // Prompt the user for information about the intern
      promptIntern().then((intern) => {
        // Add the intern object to the array
        employees.push(intern);

        // Show the menu again
        showMenu();
      });
    } else {
      // If the user does not want to add any more team members, generate the HTML page
      generateHTML(employees);
    }
  });
}


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
  var html = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Employee Summary</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  </head>
  <body>
    <div class="container">
  `;

  employees.forEach((employee) => {
    html += `
    <div class="card mt-4" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${employee.name}</h5>
        <p class="card-text"><em>${employee.role}</em></p>
        <p class="card-text">ID: ${employee.id}</p>
        <p class="card-text">Email: ${employee.email}</p>
        `;
        switch (employee.role) {
          case "Manager":
            html += `<p class="card-text">Office number: ${employee.officeNumber}</p>`;
            break;
          case "Engineer":
            html += `<p class="card-text">GitHub username: ${employee.github}</p>`;
            break;
          case "Intern":
            html += `<p class="card-text">School: ${employee.school}</p>`;
            break;
        }
    html += `
      </div>
    </div>
    `;
  });

  html += `
    </div>
  </body>
  </html>
  `;

  // Write the HTML to a file
  fs.writeFile("employees.html", html, function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("Employee summary generated successfully!");
  });
}

// Show the menu
showMenu();