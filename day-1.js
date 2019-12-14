const https = require('https');
const fs = require('fs');
const path = require('path');
// promisify is a tool in the util module that transforms a callback function into a promise one
const { promisify } = require('util')
const readFile = promisify(fs.readFile)

const inputURL = 'https://adventofcode.com/2019/day/1/input';
const filePath = path.join(__dirname, 'input-day-1.txt');

const Solution = async () => {
    // Get Input data
    try {
        const inputData = await readFile(filePath, { encoding: 'utf-8' })
        // await HTTPRequest(options)
        let parsedInp = await parseInputAsArray(inputData)
        // Get FuelRequirements for every element
        const res1 = parsedInp.reduce(FuelReqdReducer, 0)
        console.log('Answer to the puzzle 1 is : ')
        console.log(res1);
        console.log('Answer to puzzle 2 is : ');
        const res2 = parsedInp.reduce(FuelReqdWithFuelMassReducer, 0);
        console.log(res2);
    } catch (err) {
        console.log("Uh oh! Error \n")
        console.log(err)
    }
    return Promise.resolve()
}

const parseInputAsArray = (data) => {
    return new Promise((resolve, reject) => {
        let dataArr = data.split("\n");
        resolve(dataArr)
    });
}

const FuelReqdReducer = (accumulator, currentValue) => {
    // Get reqd fuel value
    currentValue = parseInt(currentValue)
    fuelReqd = fuelCalc(currentValue)
    res = parseInt(accumulator) + parseInt(fuelReqd)
    return res
}

const fuelCalc = (val) => {
    return parseInt(Math.floor(val/3) - 2);
}

const recurfuelCalc = (total, val) => {
    // console.log('Called Recur with : \n');
    // console.log('Total: '+ total +' Value: ' + val +'\n');
    newVal = fuelCalc(val)
    if (newVal <= 0) {
        // console.log('Returning total : ' + total + '\n');
        // console.log('Type of total: ' + typeof total + '\n');
        return total
    }
    total = total + newVal
    return recurfuelCalc(total, newVal) // Ask fufa: return kyun karna; basic ques
}

/**
 ** This method makes use of recursive fuelcalculator i.e. recurfuelCalc to find fuel requirements for each module and it's own fuel weight
 */
const FuelReqdWithFuelMassReducer = (accumulator, currentValue) => {
    currentValue = parseInt(currentValue)
    totalFuelForOneModule = recurfuelCalc(0, currentValue)
    res = parseInt(accumulator) + parseInt(totalFuelForOneModule)
    return res
}

exports.Solution = Solution


//TODO: Make this a REST Client.
// const options = {
//     hostname: "adventofcode.com",
//     path: "/2019/day/1/input",
//     method: 'GET'
// }
// const HTTPRequest = (options) => {
//     let parsedInput = {};
//     const req = https.request(options, (res) => {
//         console.log(`statusCode: ${res.statusCode}`)

//         let responseBody = '';
//         res.on('data', (d) => {
//             responseBody += d
//         })
//         res.on('end', () => {
//             parsedInput = JSON.parse(responseBody)
//             console.log('Parsing done')
//             // return parsedInput
//         })
//     })

//     req.on('error', (error) => {
//         console.error(error)
//     })

//     req.end()
//     // return parsedInput
// }