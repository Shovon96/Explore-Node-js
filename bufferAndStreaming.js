const fs = require('fs');

const readStream = fs.createReadStream('./file.txt', { encoding: 'utf-8' });
const writeStream = fs.createWriteStream('./file2.txt', { encoding: 'utf-8' });

readStream.on("data", (data) => {
    console.log(data);
    writeStream.write(data, (err) => {
        if (err) {
            throw Error("Error", err)
        }

    })
});

readStream.on("error", (err) => {
    if (err) {
        throw Error("error", err)
    }
});

writeStream.on("error", (err) => {
    if (err) {
        throw Error("error", err)
    }
});

readStream.on("end", () => {
    console.log("Reading Ended");
    writeStream.end();
});

writeStream.on('finish', () => {
    console.log('writen successfully')
});