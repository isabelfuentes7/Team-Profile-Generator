// importing Employee constructor 
const Employee = require("./Employee");

class Engineer extends Employee {
    constructor (name, id, email, github) {
        super (name, id, email);

        this.github = github; 
    }

    getGithub () {
        return this.github;
    }

    getRole () {
        return "Engineer";
    }
}

//engineer to be exported 
module.exports = Engineer; 