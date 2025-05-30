const fs = require("fs");
const path = require("path");

const inputArgument = process.argv.slice(2);

const textJoin = inputArgument.join(" ").concat("\n");

const timestamp = new Date().toISOString();
// console.log(timestamp);

const message = `${textJoin} added at the ${timestamp} time \n`
// console.log(textJoin);

if (!message) {
    console.log("Data is not defined");
    process.exit(1);
}

const filePath = path.join(__dirname, "log.txt");

fs.appendFile(filePath, message, { encoding: 'utf-8' }, () => {
    console.log("Your log added successfully");
})

