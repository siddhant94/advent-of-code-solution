
// const InputArr = [1,9,10,3,2,3,11,0,99,30,40,50]; // result = [3500,9,10,70,2,3,11,0,99,30,40,50]
// const InputArr = [1,0,0,0,99] // result = [2,0,0,0,99]
const InputArr = [1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,13,1,19,1,19,6,23,1,23,6,27,1,13,27,31,2,13,31,35,1,5,35,39,2,39,13,43,1,10,43,47,2,13,47,51,1,6,51,55,2,55,13,59,1,59,10,63,1,63,10,67,2,10,67,71,1,6,71,75,1,10,75,79,1,79,9,83,2,83,6,87,2,87,9,91,1,5,91,95,1,6,95,99,1,99,9,103,2,10,103,107,1,107,6,111,2,9,111,115,1,5,115,119,1,10,119,123,1,2,123,127,1,127,6,0,99,2,14,0,0];
// const InputArr = [1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,13,1,19,1,19,6,23,1,23,6,27,1,13,27,31,2,13,31,35,1,5,35,39,2,39,13,43,1,10,43,47,2,13,47,51,1,6,51,55,2,55,13,59,1,59,10,63,1,63,10,67,2,10,67,71,1,6,71,75,1,10,75,79,1,79,9,83,2,83,6,87,2,87,9,91,1,5,91,95,1,6,95,99];
// TODO: Check why above commented InputArr does not produce output
let resultantArray = [];
let noun = verb = null;
const Solution1 = () => {
    noun = 12
    verb = 2
    ProcessIntCodeInput(InputArr, noun, verb)
    console.log("Part 1 => Value at position 0 : " + resultantArray[0]);
    return Promise.resolve()
}

// const handleExitOpCode = () => {
//     console.log(" Part 1 => Value at position 0 : " + resultantArray[0]);
//     return// process.exit() // Halt Processing / Exit
// }

const Solution2 = () => {
    [...Array(100).keys()].map((noun) => {
        [...Array(100).keys()].map((verb) => {
            resultantArray = [];
            ProcessIntCodeInput(InputArr, noun, verb)
            if (resultantArray[0] == 19690720) {
                console.log('Part 2 => Value for (100 * noun + verb) : ' + (100 * noun + verb) +', with Noun - ' + noun + ' Verb: ' + verb);
            }
        })
    });
}

const ProcessIntCodeInput = (InputArr, noun, verb) => {
    // Set noun, verb
    InputArr[1] = noun;
    InputArr[2] = verb;
    let opCode = null;
    let index1 = index2 = null;
    let opRes = null
    InputArr.every((value, index) => {
        if (index % 4 == 0) {
            opCode = value
            // Case 99 i.e. Halt Program execution
            if (opCode == 99) {
                // handleExitOpCode()
                return false
            }
            resultantArray.push(value)
            return true
        }
        // Check for index positions
        if(index1 == null) {
            index1 = value
            resultantArray.push(value)
            return true
        }
        if (index2 == null) {
            index2 = value
            resultantArray.push(value)
            return true
        }

        let operand1 = operand2 = null;
        if(typeof resultantArray[index1] != 'undefined') {
            operand1 = resultantArray[index1];
        } else {
            operand1 = InputArr[index1];
        }
        if(typeof resultantArray[index2] != 'undefined') {
            operand2 = resultantArray[index2];
        } else {
            operand2 =  InputArr[index2];
        }

        switch (opCode) {
            case 1:
                opRes = operand1 + operand2 // Add
                break;
            case 2:
                opRes = operand1 * operand2 // Multiply
                break;
            default:
                console.log('Unable to handle OpCode : ' + opCode);
        }
        opCode = index1 = index2 = null; // Reset all state variables
        resultantArray.push(value)
        resultantArray[value] = opRes
        return true
    })
}

exports.Solution1 = Solution1
exports.Solution2 = Solution2
// console.log('Type of total: ' + typeof total + '\n');