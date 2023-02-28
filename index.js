let Employee = require('./lib/Employee'); //pulls from employee. js we set up
let Manager = require('./lib/Manager'); //pulls from Manager. js we set up
let Intern = require('./lib/Intern');//pulls from intern. js we set up
let Engineer = require('./lib/Engineer');//pulls from engineer. js we set up
let inquirer = require('inquirer'); 
let path = require('path'); //creates path for everything to be sent to

emptyArray = []; //empty array for the responses to be added to

function myteam () { //create a base function for everything to run when we call it

    function createEngineer() { //build an object based on responses and engineer.js we set up
        inquirer.prompt([

            {
                type: "input",
                name: "engineerName",
                message: "What is the name of the Engineer?"
            },

            {
                type: "input",
                name: "engineerID",
                message: "What is the employee ID for this Engineer?"
            },

            {
                type: "input",
                name: "engineerEmail",
                message: "What is the engineer's email adress?"
            },

            {
                type: "input",
                name: "engineerGithub",
                message: "What is the Github username for this enigneer?"
            }

        ]).then(function(response) {
            const engineer = new Engineer(response.engineerName, response.engineerID, response.engineerEmail, response.engineerGithub);
            emptyArray.push(engineer);
            createTeam();
        });
    }

    function createIntern () { //build an object based on responses and intern.js we set up
        inquirer.prompt([

            {
                type: "input",
                name: "internName",
                message: "What is the name of the Intern?"
            },

            {
                type: "input",
                name: "internID",
                message: "What is the ID number for this intern?"
            },

            {
                type: "input",
                name: "internEmail",
                message: "What is the Intern's email?"
            },

            {
                type: "input",
                name: "internSchool",
                message: "What school does this intern attend?"
            }

        ]).then(function(response) {
            const intern = new Intern (response.internName, response.internID, response.internEmail, response.internSchool); //creates new class based on response
            emptyArray.push(intern); //pushes responses to the array
            createTeam();
        });


    }

    function createManager() { //build an object based on responses and manager.js we set up
        inquirer.prompt ([

            {
                type: "input",
                name: "managerName",
                message: "What is the name of the Manager?"
            },

            {
                type: "input",
                name: "managerID",
                message: "What is the employee ID for this Manager?"
            },

            {
                type: "input",
                name: "managerEmail",
                message: "What is this Manager's email?"
            },

            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is the Manager's office number?"
            }

        ]).then(function(response) {
            const manager = new Manager (response.managerName, response.managerID, response.managerEmail, response.managerOfficeNumber);
            emptyArray.push(manager);
            createTeam();
        });
    }

    function createTeam () {
        inquirer.prompt([{
            type: 'list', // creates list for the user to pick from
            message: 'What kind of employee would you like to add to your team today?', //Prompts the user, tells them what they can do with the software
            name: 'prompt', //name of the prompt so we can call on it later
            choices: ['Create a Manager', 'Create a Engineer', "Create a Intern", "All done!"] // Creates a list for the user to choose from
        }]).then(function (userInput) {
            switch(userInput.prompt){
                case 'Manager':
                    createManager();
                    break;
                case 'Enigineer':
                    createEngineer();
                    break;
                case 'Intern':
                    createIntern();
                    break;
                case 'Build':
                    createHTML();
            }
        })
    }


    function createHTML () {

        fs.writeFileSync(generateTeam(emptyArray), "UTF-8") //pushes responses to an HTML page
    }

    createTeam();

}

myteam(); // call the function to run everything we just created