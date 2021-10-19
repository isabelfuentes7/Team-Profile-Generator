// importing Employee constructor 
const Employee = require('./Employee');

class Intern extends Employee  {
    constructor (name, id, email, school) {
        super (name, id, email); 

        this.school = school; 
    }

    getSchool () {
        return this.school;
    }

    getRole () {
        return "Intern";
    }
}

//Intern to be exported 
module.exports = Intern; 