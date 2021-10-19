//Iomport modules, class, files
const generateHTML = require('./src/HTMLpage-generator');

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern'); 

const fs = require('fs'); 
const inquirer = require('inquirer');

//Team data  collection
const teamDataCollectionArray = []; 


const addNewManager = () => {
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: 'Who is the manager of this team?', 
            validate: userInput => {
                if (userInput) {
                    return true;
                } else {
                    console.log ("Please enter the manager's name!");
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "Please enter the manager's ID.",
            validate: userInput => {
                if  (isNaN(userInput)) {
                    console.log ("\nPlease enter the manager's ID!")
                    return false; 
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "Please enter the manager's email.",
            validate: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid) {
                    return true;
                } else {
                    console.log ('\nPlease enter an email!')
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "Please enter the manager's office number",
            validate: userInput => {
                if  (isNaN(userInput)) {
                    console.log ('\nPlease enter an office number!')
                    return false; 
                } else {
                    return true;
                }
            }
        }
    ])
    .then(managerUserInput => {
        const  { name, id, email, officeNumber } = managerUserInput; 
        const manager = new Manager (name, id, email, officeNumber);

        teamDataCollectionArray.push(manager); 
        console.log(manager); 
    })
};

const addEmployee = () => {
    console.log(`
    ********************************
    Adding employees to the team
    `);

    return inquirer.prompt ([
        {
            type: 'list',
            name: 'role',
            message: "Please choose your employee's role",
            choices: ['Engineer', 'Intern']
        },
        {
            type: 'input',
            name: 'name',
            message: "What's the name of the employee?", 
            validate: userInput => {
                if (userInput) {
                    return true;
                } else {
                    console.log ("\nPlease enter an employee's name!");
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "Please enter the employee's ID.",
            validate: userInput => {
                if  (isNaN(userInput)) {
                    console.log ("\nPlease enter the employee's ID!")
                    return false; 
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "Please enter the employee's email.",
            validate: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid) {
                    return true;
                } else {
                    console.log ('\nPlease enter an email!')
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: "Please enter the employee's github username.",
            when: (input) => input.role === "Engineer",
            validate: userInput => {
                if (userInput ) {
                    return true;
                } else {
                    console.log ("\nPlease enter the employee's github username!")
                }
            }
        },
        {
            type: 'input',
            name: 'school',
            message: "Please enter the intern's school",
            when: (input) => input.role === "Intern",
            validate: userInput => {
                if (userInput) {
                    return true;
                } else {
                    console.log ("\nPlease enter the intern's school!")
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAddEmployee',
            message: 'Would you like to add more team members?',
            default: false
        }
    ])
    .then(newEmployeeData => {

        let { name, id, email, role, github, school, confirmAddEmployee } = newEmployeeData; 
        let employee; 

        if (role === "Engineer") {
            employee = new Engineer (name, id, email, github);

            console.log(employee);

        } else if (role === "Intern") {
            employee = new Intern (name, id, email, school);

            console.log(employee);
        }

        teamDataCollectionArray.push(employee); 

        if (confirmAddEmployee) {
            return addEmployee(teamDataCollectionArray); 
        } else {
            return teamDataCollectionArray;
        }
    })

};


const writeFile = data => {
    fs.writeFile('./dist/index.html', data, err => {
        // if there is an error 
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("Your team profile has been successfully created! Please check  the index.html")
        }
    })
}; 

addNewManager()
  .then(addEmployee)
  .then(teamDataCollectionArray => {
    return generateHTML(teamDataCollectionArray);
  })
  .then(HTMLpage => {
    return writeFile(HTMLpage);
  })
  .catch(err => {
 console.log(err);
  });