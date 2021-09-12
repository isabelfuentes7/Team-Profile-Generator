const { default: generate } = require("@babel/generator");
const { Console } = require("console");

const user = empData => {
    if (empData.officeNumber) {
        return `Office Number: ${empData.officeNumber}`
    }
    if (empData.school) {
        return `School: ${empData.school}`
    }
    if (empData.github) {
        return `<p>Github: <a href="https://github.com/${empData.github}">${empData.github}</a></p>`
    }
};

const generateCards = templateData => {
    return `
            <body>
                <div class="header-wrapper">
                    <h1>Team Profiles</h1>
                </div>
                <div class = "grid">
                ${templateData.map((emp) => {
        return `
                    <div>
                        <h2>${emp.getName()}</h2>
                        <h3>${emp.getRole()}</h3>
                        <p>${emp.getId()}</p>
                        <p>Email: <a href="mailto:https://${emp.getEmail()}">${emp.getEmail()}</a></p>
                        <p>${user(emp)}</p>
                    </div>
    `
    }).join('')}
                </div>
            </body>`
}




module.exports = templateData => {

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Team Profiles</title>
         <link rel="stylesheet" href="style.css">
        </head>   
            ${generateCards(templateData)}                   
        </html>
        `
};