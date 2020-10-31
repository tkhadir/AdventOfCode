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

const step  = 4
const stop = 99
const opcode_add = 1
const opcode_multiply = 2

let checkstop = (data, solution) => {
    if (data == stop) {
        console.log('solution : \n' + solution)
        console.log('position[0] : \n' + solution[0])
        process.exit(0)
    }
}

let add = (data, input) => {
    let result = -1
    if (data[0] == opcode_add) {
        console.log(data[1] + ' : ' + input[data[1]] + ' + ' + input[data[2]] + ' : ' + data[2])
        result = input[data[1]] + input[data[2]]
        console.log(' = ' + result)
    }
    console.log('position ' + data[3] + ' got ' + result)
    return {'position': data[3], 'result': result}
}


let multiply = (data, input) => {
    let result = -1
    if (data[0] == opcode_multiply) {
        console.log(data[1] + ' : ' + input[data[1]] + ' * ' + input[data[2]] + ' : ' + data[2])
        result = input[data[1]] * input[data[2]]
        console.log(' = ' + result)
    }
    console.log('position ' + data[3] + ' got ' + result)
    return {'position': data[3], 'result': result}
}

let getOperationResult = (opecode, data, input) => {
    console.log('step process : ' + data)
    if (opecode == opcode_add) return add(data, input)
    else if (opecode == opcode_multiply) return multiply(data, input)
    else return -1
}

let work = (data) => {
    console.log('initial data : ' + data)
    let solution = data
    let done = data.every(function(element, index, array) {
        if (index % step == 0) {
          console.log('process ele :', element + ' at ' + index)
          checkstop(element, solution)
          let subdata = [solution[index], solution[index + 1], solution[index + 2], solution[index + 3]]
          let response = getOperationResult(element, subdata, solution)
          solution[response['position']] = response['result']
          console.log('step result : ' + solution)
        }
        return true
    })
    return done
}


let inputs = readContent('inputs.txt')


let test = (data) => {
    work(data)
}

let solve = (data) => {
    data[1] = 12
    data[2] = 2
    work(data)
}

//let bench0 = [1,9,10,3,2,3,11,0,99,30,40,50]
//let bench0 = [1,0,0,0,99]
//let bench0 = [2,3,0,3,99]
//let bench0 = [2,4,4,5,99,0]
//let bench0 = [1,1,1,4,99,5,6,0,99]
//test(bench0)
//console.log(bench0)

console.log('found solution : ------------------')
solve(inputs.split(',').map(n => parseInt(n)))
console.log('-----------------------------------')