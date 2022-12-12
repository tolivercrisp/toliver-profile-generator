// These are unit tests that verify that the name, id, and email properties are set correctly when the respective object is created.

// Import the Employee class
const Employee  = require('../app.js');
const Manager  = require('../app.js');
const Engineer  = require('../app.js');
const Intern  = require('../app.js');

// Write a test case for the Employee class
test('Succesfully creates an Employee object with the correct name, id, and email', () => {
  const employee = new Employee('John Doe', 123, 'johndoe@example.com');

  expect(employee.name).toEqual(expect.any(String));
  expect(employee.id).toEqual(expect.any(Number));
  expect(employee.email).toEqual(expect.any(String));
});

// Write a test case for the Manager class
test('Succesfully creates an Manager object with the correct name, id, and email', () => {
  const manager = new Manager('John Doe', 123, 'johndoe@example.com');

  expect(manager.name).toEqual(expect.any(String));
  expect(manager.id).toEqual(expect.any(Number));
  expect(manager.email).toEqual(expect.any(String));
});

// Write a test case for the Engineer class
test('Succesfully creates an Engineer object with the correct name, id, and email', () => {
    const engineer = new Engineer('John Doe', 123, 'johndoe@example.com');
  
    expect(engineer.name).toEqual(expect.any(String));
    expect(engineer.id).toEqual(expect.any(Number));
    expect(engineer.email).toEqual(expect.any(String));
  });

  // Write a test case for the Intern class
test('Succesfully creates an Intern object with the correct name, id, and email', () => {
    const intern = new Intern('John Doe', 123, 'johndoe@example.com');
  
    expect(intern.name).toEqual(expect.any(String));
    expect(intern.id).toEqual(expect.any(Number));
    expect(intern.email).toEqual(expect.any(String));
  });