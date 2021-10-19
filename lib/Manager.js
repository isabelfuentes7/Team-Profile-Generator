// importing Employee constructor 
const Employee = require('./Employee');

class Manager extends Employee {
    constructor (name, id, email, officeNumber) {
        super (name, id, email); 
        
        this.officeNumber = officeNumber; 
    }

    getRole () {
        return "Manager";
    }
}

//Manager to be exported 
module.exports = Manager; 