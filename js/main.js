// Define the number of rows and columns in the grid
const numRows = 16;
const numCols = numRows;

// Border color
const borderColor = 'darkgrey';

// Get the grid container element
const gridContainer = document.getElementById('maze');

// Initialize an empty array to store squares
const squares = [];

// Generate the grid of squares
function generateGrid(rows, columns) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            // Create a new square object with all walls intact
            const square = {
                index: i * columns + j,
                top: true,
                right: true,
                bottom: (i === rows - 1),
                left: (j === 0),
                x: j + 1, // X-coordinate
                y: i + 1, // Y-coordinate
                visited: false,
                isStart: false
            };
            
            squares.push(square);
        }
    }
}

// Generate the grid of squares as div elements
function generateDivs() {
    squares.forEach(square => {
        // Create a new square div element
        const squareDiv = document.createElement('div');
    
        // Add the square class to the div
        squareDiv.classList.add('square');
    
        // Set border styles based on the attributes of the square object
        if (square.top) {
            squareDiv.style.borderTop = `2px solid ${borderColor}`;
        }
        if (square.right) {
            squareDiv.style.borderRight = `2px solid ${borderColor}`;
        }
        if (square.bottom) {
            squareDiv.style.borderBottom = `2px solid ${borderColor}`;
        }
        if (square.left) {
            squareDiv.style.borderLeft = `2px solid ${borderColor}`;
        }
        if (square.isStart) {
            squareDiv.style.color = "yellow";
        }
        // if (square.visited) {
        //     squareDiv.style.backgroundColor = "green";
        // }
        squareDiv.innerText = square.index;

        gridContainer.appendChild(squareDiv);
    });
}

function generateMazeDFS(currentSquare) {
    // Mark the current square as visited
    currentSquare.visited = true;

    // Get shuffled list of neighboring squares
    const unvisitedNeighbors = getUnvisitedNeighbors(currentSquare);
    const shuffledNeighbors = shuffleArray(unvisitedNeighbors);
    let neighbor = shuffledNeighbors[getRandomNumber(shuffledNeighbors.length - 1)]
    if (neighbor) {
        removeWall(currentSquare, neighbor);
        generateMazeDFS(neighbor);
    }
}

function removeWall(currentSquare, neighbor) {
    if (currentSquare.x === neighbor.x) {
        if (currentSquare.y < neighbor.y) {
            currentSquare.bottom = false;
            neighbor.top = false;
        }
        if (currentSquare.y > neighbor.y) {
            currentSquare.top = false;
            neighbor.bottom = false;
        }
    }
    if (currentSquare.y === neighbor.y) {
        if (currentSquare.x < neighbor.x) {
            currentSquare.right = false;
            neighbor.left = false;
        }
        if (currentSquare.x > neighbor.x) {
            currentSquare.left = false;
            neighbor.right = false;
        }
    }
}

function getUnvisitedNeighbors(currentSquare) {
    const { x, y } = currentSquare;
    const unvisitedNeighbors = [];

    // Define helper function to check if a neighboring cell is visited
    function isVisited(x, y) {
        const neighbor = getSquareByCoordinates(x, y);
        return neighbor && neighbor.visited;
    }

    // Check and add unvisited neighbors
    if (y > 1 && !isVisited(x, y - 1)) {
        unvisitedNeighbors.push(getSquareByCoordinates(x, y - 1)); // Top neighbor
    }
    if (x < numCols && !isVisited(x + 1, y)) {
        unvisitedNeighbors.push(getSquareByCoordinates(x + 1, y)); // Right neighbor
    }
    if (y < numRows && !isVisited(x, y + 1)) {
        unvisitedNeighbors.push(getSquareByCoordinates(x, y + 1)); // Bottom neighbor
    }
    if (x > 1 && !isVisited(x - 1, y)) {
        unvisitedNeighbors.push(getSquareByCoordinates(x - 1, y)); // Left neighbor
    }
console.log(unvisitedNeighbors)
    return unvisitedNeighbors;
}

function getSquareByCoordinates(x, y) {
    const square = squares.find(square => square.x === x && square.y === y);
    if (square) {
        return square;
    } else {
        return false;
    }
}

generateGrid(numRows, numCols);
const startingSquare = getRandomSquare(squares);
startingSquare.isStart = true;
generateMazeDFS(startingSquare);
generateDivs();


// HELPER SECTION

function getRandomSquare(squares) {
    return squares[getRandomNumber(squares.length - 1)]
}

function getRandomNumber(x) {
    return Math.floor(Math.random() * x);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}