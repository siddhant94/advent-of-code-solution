
const InputArr = [1,9,10,3,2,3,11,0,99,30,40,50]; // result = [3500,9,10,70,2,3,11,0,99,30,40,50]
// const InputArr = [1,0,0,0,99]
// 1,0,0,0,99 => 2,0,0,0,99
let resultantArray = [];
const Solution = () => {
    
    let opCode = null;
    let index1 = index2 = null;
    let opRes = null
    InputArr.forEach((value, index) => {
        if (index % 4 == 0) {
            opCode = value
            // Case 99 i.e. Halt Program execution
            if (opCode == 99) {
                handleExitOpCode()
            }
            resultantArray.push(value)
            return
        }
        // Check for index positions
        if(index1 == null) {
            index1 = value
            resultantArray.push(value)
            return;
        }
        if (index2 == null) {
            index2 = value
            resultantArray.push(value)
            return;
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
        return
    })
}

const handleExitOpCode = () => {
    console.log(resultantArray);
    process.exit() // Halt Processing / Exit
}

exports.Solution = Solution
// console.log('Type of total: ' + typeof total + '\n');