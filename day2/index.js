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

let getRange = (start, end) => {
    let stream = []
    for (let i=start; i<= end; i++) {
        stream.push(i)
    }
    return stream
}

const step  = 4
const stop = 99
const opcode_add = 1
const opcode_multiply = 2

let add = (data, input) => {
    let result = -1
    if (data[0] == opcode_add) {
        //console.log(data[1] + ' : ' + input[data[1]] + ' + ' + input[data[2]] + ' : ' + data[2])
        result = input[data[1]] + input[data[2]]
        //console.log(' = ' + result)
    }
    //console.log('position ' + data[3] + ' got ' + result)
    return {'position': data[3], 'result': result}
}


let multiply = (data, input) => {
    let result = -1
    if (data[0] == opcode_multiply) {
        //console.log(data[1] + ' : ' + input[data[1]] + ' * ' + input[data[2]] + ' : ' + data[2])
        result = input[data[1]] * input[data[2]]
        //console.log(' = ' + result)
    }
    //console.log('position ' + data[3] + ' got ' + result)
    return {'position': data[3], 'result': result}
}

let getOperationResult = (opecode, data, input) => {
    //console.log('step process : ' + data)
    if (opecode == opcode_add) return add(data, input)
    else if (opecode == opcode_multiply) return multiply(data, input)
    else return -1
}

let work = (data) => {
    console.log('initial data : ' + data)
    let solution = data
    solution[1] = 12
    solution[2] = 2
    data.every(function(element, index, array) {
        if (index % step == 0) {
          console.log('process ele :', element + ' at ' + index)
          //checkstop(element, solution)
          console.log('position[0] : \n' + solution[0])
          if (element == stop) return false
          let subdata = [solution[index], solution[index + 1], solution[index + 2], solution[index + 3]]
          let response = getOperationResult(element, subdata, solution)
          solution[response['position']] = response['result']
          console.log('step result : ' + solution)
        }
        return true
    })
}

let workV2 = (data, noun, verb, goal) => {
    //console.log('initial data : ' + data)
    let solution = []
    data.forEach(d => solution.push(d))
    solution[1] = noun
    solution[2] = verb
    console.log('initial data : ' + solution)
    data.every(function(element, index, array) {
        if (index % step == 0) {
          //console.log('process ele :', element + ' at ' + index + ' compare ' + (solution[0] === goal))
          if (element == stop || solution[0] === goal) return false
          let subdata = [solution[index], solution[index + 1], solution[index + 2], solution[index + 3]]
          let response = getOperationResult(element, subdata, solution)
          solution[response['position']] = response['result']
          //console.log('step result : ' + solution)
        }
        return true
    })
    console.log('position[0] ' + solution[0])
    console.log('noun ' + noun)
    console.log('verb ' + verb)
    console.log('answer ' + ((100 * noun) + verb))
    if (solution[0] === goal) process.exit(0)
}


const inputs = readContent('inputs.txt').split(',').map(n => parseInt(n))


let test = (data) => {
    work(data)
}

let solve = (data) => {
    work(data)
}

let solveV2 = (data) => {
    let nounRange = getRange(0, 99)
    let verbRange = getRange(0, 99)
    nounRange.forEach(noun => {
        verbRange.forEach(verb => {
            //console.log('noun : ' + noun + ' verb ' + verb)
            workV2(data, noun, verb, 19690720)
        })
    })
}

//let bench0 = [1,9,10,3,2,3,11,0,99,30,40,50]
//let bench0 = [1,0,0,0,99]
//let bench0 = [2,3,0,3,99]
//let bench0 = [2,4,4,5,99,0]
//let bench0 = [1,1,1,4,99,5,6,0,99]
//test(bench0)
//console.log(bench0)

const part1 = 1
const part2 = 2
let solvePart = process.argv.slice(2)[0] == 2 ? part2 : part1

console.log('solving part : ' + solvePart)
console.log('found solution : ------------------')
if (solvePart == part2) {
    solveV2(inputs)
} else {
    solve(inputs)
}
console.log('-----------------------------------')