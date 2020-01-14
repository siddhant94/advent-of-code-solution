const fs = require('fs');
const path = require('path');
const { promisify } = require('util')
const readFile = promisify(fs.readFile)

const filePath = path.join(__dirname, 'input-day-3.txt');

const Solution1 = async () => {
    // const inputData = "R8,U5,L5,D3\nU7,R6,D4,L4"; // 6
    // const inputData = "R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83" // 159
    // const inputData = "R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\nU98,R91,D20,R16,D67,R40,U7,R15,U6,R7" // md = 135, steps = 410
    const inputData = await readFile(filePath, { encoding: 'utf-8' })
    let segments1 = getSegments(inputData.split('\n')[0].split(','))
    let segments2 = getSegments(inputData.split('\n')[1].split(','))
    let intersectionPoints = [];
    let steps1 = 0;
    segments1.map((seg1Ele) => {
        let steps2 = 0;
        segments2.map((seg2Ele) => {
            p0 = seg1Ele.from
            p1 = seg1Ele.to
            p2 = seg2Ele.from
            p3 = seg2Ele.to
            res = segmentIntersect(p0, p1, p2, p3)
            if(res) {
                // For current segements calculate upto intersection points
                let s1 = manhattanDistance(seg1Ele.from, res),
                s2 = manhattanDistance(seg2Ele.from, res);
                res['steps'] = steps1+ steps2 + s1 + s2;
                intersectionPoints.push(res)
            }
            steps2 += manhattanDistance(seg2Ele.from, seg2Ele.to)
        });
        steps1 += manhattanDistance(seg1Ele.from, seg1Ele.to)
    });
    // Find smallest Manhataan Distance for all the points
    let smallest = undefined,
    leastStepsToIntersection = undefined;
    intersectionPoints.map((point) => {
        let origin = { x: 0, y: 0 },
        d = manhattanDistance(point, origin)// Math.abs(point.x - origin.x) + Math.abs(point.y - origin.y);
        if (d != 0) {
            if (d < smallest) {
                smallest = d;   // Update smallest
            } else if (typeof smallest === 'undefined') {
                smallest = d;   // First entry
            }
            // Store the least steps
            if (leastStepsToIntersection > point.steps) {
                leastStepsToIntersection = point.steps
            } else if (typeof leastStepsToIntersection === 'undefined') {
                leastStepsToIntersection = point.steps // first entry
                console.log(point.steps)
            }
        }

    });
    console.log("The Manhattan distance from the central port to the closest intersection : " + smallest)
    console.log("The fewest combined steps the wires must take to reach an intersection : " + leastStepsToIntersection)
}

// Manhattan Distance : In a plane with p1 at (x1, y1) and p2 at (x2, y2), it is |x1 - x2| + |y1 - y2|
const manhattanDistance = (p1, p2) => {
    return (Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y));
}

// Beautiful video describing the concept - https://www.youtube.com/watch?v=A86COO8KC58
const segmentIntersect = (p0, p1, p2, p3) => {
    // Std Eq - Ax + By = C
let A1 = p1.y - p0.y,
    B1 = p0.x - p1.x,
    C1 = A1 * p0.x + B1 * p0.y,
    A2 = p3.y - p2.y,
    B2 = p2.x - p3.x,
    C2 = A2 * p2.x + B2 * p2.y,
    denominator = A1 * B2 - A2 * B1;

    if(denominator == 0) { // Lines are parallel or collinear
        return null;
    }
    let intersectX = (B2 * C1 - B1 * C2) / denominator,
        intersectY = (A1 * C2 - A2 * C1) / denominator,
        rx0 = (intersectX - p0.x) / (p1.x - p0.x),
        ry0 = (intersectY - p0.y) / (p1.y - p0.y),
        rx1 = (intersectX - p2.x) / (p3.x - p2.x),
        ry1 = (intersectY - p2.y) / (p3.y - p2.y);

    if(((rx0 >= 0 && rx0 <= 1) || (ry0 >= 0 && ry0 <= 1)) &&
        ((rx1 >= 0 && rx1 <= 1) || (ry1 >= 0 && ry1 <= 1))) {
            return {
                x: intersectX,
                y: intersectY
            };
    } else {
        return null;
    }
}

const getSegments = (linePath) => {
    let segments = [];
    let position = {x:0, y:0}
    linePath.map((ele) => {
    //   ele = [...ele]
    //   let direction = ele.shift();
      let direction = ele[0];
      let units = parseInt(ele.slice(1), 10)
      let nextPosition = {
          x: position.x,
          y: position.y
      }
      switch(direction) {
        case "U":
            nextPosition.y += units;
            break;
        case "D":
            nextPosition.y -= units;
            break;
        case "R":
            nextPosition.x += units;
            break;
        case "L":
            nextPosition.x -= units;
            break;
        default:
            console.log("Unhandled Direction");
      }

      segments.push({
          from: {
              x: position.x,
              y: position.y
          },
          to: {
              x: nextPosition.x,
              y: nextPosition.y
          }
      });

      position = nextPosition
    })
    return segments;
}

exports.Solution1 = Solution1