// Syncrhonus way file read and write system.

const fs = require('fs');

console.log('task 1');

const writeText = "Learning syncrhonusly file system";

fs.writeFileSync("./file.txt", writeText);  // text file er moddhe text write kore

console.log('task 2');

const readText = fs.readFileSync("./file.txt", {encoding: 'utf-8'}); // // text file theke text read kore

console.log(readText);
console.log('task 3');



// Asyncrhonus way file read and write system.

console.log('task-Async 1');
const writeText2 = "Learning Asyncrhonusly file system read";
fs.writeFileSync("./file.txt", writeText2);
fs.readFile('./file.txt', {encoding: 'utf-8'}, (err, data) => {
    if (err){
        console.log('Something went wrong', err)
    }
    console.log(data, 'inside');
});

console.log('task-Async 3');