const fs = require('fs')

setTimeout(() => {
    console.log('setTimeout 1 finished')
}, 0)
setImmediate(() => {
    console.log('setImmediate 1 finished')
})

fs.readFile('text.txt', () => {
    console.log('I / O finished')
    setTimeout(() => {
        console.log('setTimeout 3 finished')
    }, 0)
    setImmediate(() => {
        console.log('setImmediate 4 finished')
    })
    
})

console.log('program started')
