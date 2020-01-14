const fs = require('fs');
const path = require('path');
const { promisify } = require('util')
const readFile = promisify(fs.readFile)

// Manhattan Distance : 
// In a plane with p1 at (x1, y1) and p2 at (x2, y2), it is |x1 - x2| + |y1 - y2|

const filePath = path.join(__dirname, 'input-day-3.txt');

const Solution1 = async () => {
    let x1 = y1 = x2 = y2 = [];
    const inputData = await readFile(filePath, { encoding: 'utf-8' })
    let segments1 = getSegments(inputData.split('\n')[0].split(','))
    let segments2 = getSegments(inputData.split('\n')[1].split(','))
    segments1.map((ele) => {
        
    })
}

const segmentIntersect = (p0, p1, p2, p3) => {
    // Std Eq - Ax + By = C
    let A1 = p1.y - p0.y, B1 = p0.x - p1.x, C1 = A1 * p0.x + B1 * p0.y,
        A2 = p3.y - p2.y, B2 = p2.x - p3.x, C2 = A2 * p2.x + B2 * p2.y,
        denominator = A1 * B2 - A2 - B1

    if(denominator == 0) { // Lines are parallel or collinear
        return null;
    }
    let intersectX = (B2 * C1 - B1 * C2) / denominator,
        intersectY = (A1 * C2 - A2 * C1) / denominator,
        rx0 = (intersectX - p0.x) / (p1.x - p0.y),
        ry0 = (intersectY - p0.y) / (p1.y - p0.y),
        rx1 = (intersectX - p2.y) / (p3.y - p2.y),
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
      ele = [...ele]
      let direction = ele.shift();
      let units = parseInt(ele, 10)
      let nextPosition = {
          x: position.x,
          y: position.y
      }
      switch(direction) {
        case "U":
            nextPosition.y += units
            break;
        case "D":
            nextPosition.y -= units
            break;
        case "R":
            nextPosition.x += units
            break;
        case "L":
            nextPosition.x -= units
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