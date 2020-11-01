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

const inputs = readContent('inputs.txt').split('-').map(n => parseInt(n))
console.log(inputs)

let containsTwoSimilar = (data) => {
    return data.split('').find((d, index) => {
        return index > 0 && (data[index] == data[index - 1]) 
    }) != undefined
}

let isIncreasing = (data) => {
    return data.split('').every((element, index, array) => {
        let past = index > 0 ? parseInt(array[index - 1]) : -1
        if (element >= past) {
            return true
        } 
        return false
    })
}


let availablePass = (min, max) => {
    let countc2 = 0
    let countc1 = 0
    let countc0 = 0
    let stream = getRange(min, max)
    //console.log(stream)
    let result = stream.filter(n => {
        let sn = (n + '')
        let isLengthValid = (sn.length == 6)
        countc0 += isLengthValid ? 1 : 0
        let containsTwoAdjacentDigits = containsTwoSimilar(sn)
        countc1 += containsTwoAdjacentDigits ? 1 : 0
        let neverdecrease = isIncreasing(sn)
        countc2 += neverdecrease ? 1 : 0
        return isLengthValid && containsTwoAdjacentDigits && neverdecrease
    })
    console.log(countc0)
    console.log(countc1)
    console.log(countc2)
    console.log(result)
    return result
}


console.log(availablePass(inputs[0], inputs[1]).length)