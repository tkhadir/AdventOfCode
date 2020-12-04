const fs = require('fs')

let getRange = (start, end) => {
    let stream = []
    for (let i=start; i<= end; i++) {
        stream.push(i)
    }
    return stream
}

let readContent = (filename) => {
    try {
        console.log('fetching data from : ' + filename)
        return fs.readFileSync(filename, 'utf8')
    } catch (err) {
        console.error(err)
        return ''
    }
}

let cloneArr = (data) => {
    let clone = []
    data.forEach(d => clone.push(d))
    return clone
}


