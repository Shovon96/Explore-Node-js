const EventEmitter = require('node:events');

class SchollBell extends EventEmitter{};

const schollBell = new SchollBell();

schollBell.on('ring', () => {
    console.log('The class is end')
});
schollBell.on('ring', () => {
    console.log('And one more class is start')
});
schollBell.on('broken', () => {
    console.log('The bell is broken and class will be goan infinity.')
});

schollBell.emit('ring');
schollBell.emit('broken');
