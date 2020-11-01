const fs = require('fs')

let readContent = (filename) => {
    try {
        console.log('fetching data from : ' + filename)
        return fs.readFileSync(filename, 'utf8')
    } catch (err) {
        console.error(err)
        return ''
    }
}

const inputs = readContent('inputs.txt')

let isPointsEqual = (x1, x2, y1, y2) => {
    //console.log(x1 + ' ' + x2 + ' ' + y1 + ' ' + y2)
    return x1 === x2 && y1 === y2
}


let manhattanDist = (x1, x2, y1, y2) => {
    return Math.abs(x2 - x1) + Math.abs(y2 - y1)
}

let addXpoints = (x1, step, y, tuples, totstep) => {
    for (let i = 1; i <= step; i++) {
        tuples.push({'x': (x1 + i), 'y': y, 'step': (totstep + i)})
    }
}

let minusXpoints = (x1, step, y, tuples, totstep) => {
    for (let i = 1; i <= step; i++) {
        tuples.push({'x': (x1 - i), 'y': y, 'step': (totstep + i)})
    }
}

let addYpoints = (x, y1, step, tuples, totstep) => {
    for (let i = 1; i <= step; i++) {
        tuples.push({'x': x, 'y': (y1 + i), 'step': (totstep + i)})
    }
}

let minusYpoints = (x, y1, step, tuples, totstep) => {
    for (let i = 1; i <= step; i++) {
        tuples.push({'x': x, 'y': (y1 - i), 'step': (totstep + i)})
    }
}

let operate = (p, tuples, totstep) => {
    let step  = 0
    if (p.includes('R')) {
        let last = tuples[tuples.length - 1]
        step = parseInt(p.replace('R', ''))
        addXpoints(last['x'], step, last['y'], tuples, totstep)
    }
    if (p.includes('L')) {
        let last = tuples[tuples.length - 1]
        step = parseInt(p.replace('L', ''))
        minusXpoints(last['x'], step,  last['y'], tuples, totstep)
    }
    if (p.includes('U')) {
        let last = tuples[tuples.length - 1]
        step = parseInt(p.replace('U', ''))
        addYpoints(last['x'], last['y'], step, tuples, totstep)
    }
    if (p.includes('D')) {
        let last = tuples[tuples.length - 1]
        step = parseInt(p.replace('D', ''))
        minusYpoints(last['x'], last['y'], step, tuples, totstep)
    }
    return step
} 

let foundCrossPoint = (d1, d2, v) => {
    let center = {'x': 0, 'y': 0}
    let tuples1 = [center]
    let tuples2 = [center]

    let s1 = 0
    d1.forEach(p => {
        let st = operate(p, tuples1, s1)
        s1 += st
    })

    let s2 = 0
    d2.forEach(p => {
        let st = operate(p, tuples2, s2)
        s2 += st
    })

    console.log(tuples1)
    console.log(tuples2)

    let cross = []

    tuples1.forEach(p => {
        let result = tuples2.find(p2 => isPointsEqual(p['x'], p2['x'], p['y'], p2['y']) && p != center)
        if (result != undefined){
            result['crossStep'] = p['step'] + result['step']
            cross.push(result)
        }
    })

    if (v == 1) {
        cross = cross.sort((a, b) => manhattanDist(a['x'], center['x'], a['y'], center['y']) - manhattanDist(b['x'], center['x'], b['y'], center['y']))
        cross.forEach(c =>
            console.log('dist ' + manhattanDist(c['x'], center['x'], c['y'], center['y']))
        )
    } else {
        cross = cross.sort((a, b) => a['crossStep'] - b['crossStep'])
        cross.forEach(c =>
            console.log('steps ' + c['crossStep'])
        )
    }
    console.log(cross)
    
    return cross
}

//let lines = inputs.split('\n')

//lines.forEach(l => console.log(l))


let bench0 = 'R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83'
let bench1 = 'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\nU98,R91,D20,R16,D67,R40,U7,R15,U6,R7'
let bench2 = 'R8,U5,L5,D3\nU7,R6,D4,L4'

let lines = []
inputs.split('\n').forEach(l => lines.push(l.split(',')))


foundCrossPoint(lines[0], lines[1], 2)
