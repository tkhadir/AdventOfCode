const fs = require('fs')

class Planet {
    constructor(k, v) {
        this.key = k
        this.inOrbitArround = v
    }

    get name() {
        return this.key
    }

    get origine() {
        return this.inOrbitArround
    }
}

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

const input = readContent('./input.txt')

let planets = []
let links = []

input.split('\r\n').forEach(i => {
    let split = i.split('\)')
    planets.push(new Planet(split[1], split[0]))
})

const addIndirectLink = (p) => {
    if (p === undefined) return
    let op = planets.find(op$ => op$.name === p.origine)
    if (op && !links[op.name+'-'+p.origine]) links.push([op.name+'-'+p.origine])
    addIndirectLink(op)
}

planets.forEach(p => {
    if (!links[p.name+'-'+p.origine]) links.push([p.name+'-'+p.origine])
    addIndirectLink(p)
})

console.log(links.length)

