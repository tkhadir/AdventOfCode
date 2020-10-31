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


const inputsFileName = 'inputs.txt'

let inputs = readContent(inputsFileName)

console.log('received inputs : ---------------')
console.log(inputs)
console.log('---------------------------------')


let computeFuel = (masse) => {
    let result = Math.trunc(masse / 3)
    return result - 2
}

let test = (testData) => {
    testData
    .filter(t => t.length > 0)
    .map(t => [t, computeFuel(t)])
    .forEach(r => {
        console.log('comput fuel for ' + r[0] + ' fuel = ' + r[1])
    })
}

let testData = ['12', '14', '1969', '100756']
test(testData)

console.log('part 1 : compute solution :------------')
let s1 = inputs.split('\n')
                .filter(i => i.length > 0)
                .map(d => computeFuel(d))
                .reduce((d1, d2) => d1 + d2, 0)
console.log('final solution : ' + s1)


console.log('------------------------------')

let computeRealFuel = (data) => {
    let result = 0
    let needComputing = true
    let tmp = data
    while (needComputing) {
        tmp = computeFuel(tmp)
        result += (tmp > 0 ? tmp : 0)
        needComputing = tmp > 0
    }
    return result
}


let test2 = (testData) => {
    testData
    .filter(t => t.length > 0)
    .map(t => [t, computeRealFuel(t)])
    .forEach(r => {
        console.log('comput real fuel for ' + r[0] + ' fuel = ' + r[1])
    })
}
test2(testData)

console.log('part 2 : compute solution :-------------')
let s2 = inputs.split('\n')
            .filter(i => i.length > 0)
            .map(d => computeRealFuel(d))
            .reduce((d1, d2) => d1 + d2, 0)
console.log('final solution : ' + s2)
