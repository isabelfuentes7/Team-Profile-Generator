const { off } = require("process");
const Employee = require("./Employee")

class Manager extends Employee {
    constructor(name = "", id = "", email = "", officeNumber = "") {
        super(name, id, email);

        this.officeNumber = officeNumber;
    }

    getOfficeNumber() {
        return `Office Number: ${this.officeNumber}`;
    }

    getRole() {
        return 'Role: Manager'
    }
}

module.exports = Manager;