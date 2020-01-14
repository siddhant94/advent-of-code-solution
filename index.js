const day1 = require('./day-1')
const day2 = require('./day-2')
const day3 = require('./day-3')

const main = async () => {
    console.log("Welcome to Advent of Code Solutions \n");
    console.log("Hitting the first solution \n")
    await day1.Solution()

    console.log("\nHitting the second solution \n")
    await day2.Solution1()
    await day2.Solution2()
    
    console.log("\nHitting the third solution \n")
    await day3.Solution1()
}

main()