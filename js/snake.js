// SNAKE RECREATION 

//GLOBAL CONSTANTS
const NUM_ROWS = 20;
const NUM_COLS = 30;

//Creat an array to represent a grid 
//The grid will start at 0 in the top left corner
let grid = createGridArray();

//Add a player to the grid array (green div)
let player = {
    row: 9,
    col: 14,
    dir: 'unmoving'
}

grid[player.row][player.col] = 2;

//Add an apple to the grid array (red div)
let apples = {
    row: 7,
    col: 7
}

grid[apples.row][apples.col] = 3;

//Add the location of player
let player2 = [];

//Length of player
let numApples = 2;

//Create divs to model the grid array 
createDivGrid(grid);


//Player Movement - Key Event Listeners 
document.addEventListener('keydown', setDirection);
document.getElementById('reset-btn').addEventListener('click', resetPositions);


//Player Movement - Event Functions 
function setDirection(event) {
    console.log(event.keyCode);

    if (event.keyCode == 39) { //Right Arrow key
        player.dir = 'right';

    } else if (event.keyCode == 37) { //Left Arrow Key
        player.dir = 'left';

    } else if (event.keyCode == 38) { //Up Arrow Key
        player.dir = 'up';

    } else if (event.keyCode == 40) { //Down Arrow Key
        player.dir = 'down';

    }

}

//Set the speed of the snake
setInterval(testDirection, 150);

function testDirection() {
    if (player.dir == 'right') { //Right Arrow key
        updatePlayer(player.row, player.col + 1);

    } else if (player.dir == 'left') { //Left Arrow Key
        updatePlayer(player.row, player.col - 1);

    } else if (player.dir == 'up') { //Up Arrow Key
        updatePlayer(player.row - 1, player.col);

    } else if (player.dir == 'down') { //Down Arrow Key
        updatePlayer(player.row + 1, player.col);

    }
}

function updatePlayer(newRow, newCol) {
    //When the player eats an apple add 2 to the player
    //Add player location to empty array 
    player2.push([player.row, player.col]);

    if (player.row == apples.row && player.col == apples.col) {
        cellId = 'cell' + apples.row + '-' + apples.col
        document.getElementById(cellId).classList.remove('apples');

        //Add apple to random location on the grid
        apples.row = Math.randomInt(1, 19);
        apples.col = Math.randomInt(1, 29);

        cellId = 'cell' + apples.row + '-' + apples.col
        document.getElementById(cellId).classList.add('apples');

        grid[apples.row][apples.col] = 3;

        //Increase the length of the player when an apple is eaten
        numApples += 2;
    }

    //Remove player from previous location (remove the tail) 
    if (player2.length == numApples) {
        player.row = player2[0][0];
        player.col = player2[0][1];

        cellId = 'cell' + player.row + '-' + player.col
        document.getElementById(cellId).classList.remove('player');

        player2.shift();
    }

    //Stop game when the player passes the grid 
    if (newRow < 1 || newRow > NUM_ROWS - 2 || newCol < 1 || newCol > NUM_COLS - 2) {
        document.getElementById('game-over').innerHTML = 'GAME OVER';
        document.getElementById('game-over').style.color = 'yellow';
        document.getElementById('length').innerHTML = 'Length:' + ' ' + numApples;
        player.dir = 'unmoving';
    }

    //Update class and grid of new player location (the head of the snake) 
    player.row = newRow;
    player.col = newCol;

    cellId = 'cell' + player.row + '-' + player.col
    document.getElementById(cellId).classList.add('player');

    grid[player.row][player.col] = 2;

    //Stop game when the the location of the head equals any point in the body
    for (i = 0; i < player2.length; i++) {
        if (player.row == player2[i][0] && player.col == player2[i][1]) {
            document.getElementById('game-over').innerHTML = 'GAME OVER';
            document.getElementById('game-over').style.color = 'yellow';
            document.getElementById('length').innerHTML = 'Length:' + ' ' + numApples;
            player.dir = 'unmoving';
        }
    }

}

function resetPositions() {
    for (i = 0; i < player2.length; i++) {
        cellId = 'cell' + player2[i][0] + '-' + player2[i][1]
        document.getElementById(cellId).classList.remove('player');

        grid[player2[i][0]][player2[i][1]] = 0;

        player2.shift();
    }

    console.log(player2);

    cellId = 'cell' + apples.row + '-' + apples.col
    document.getElementById(cellId).classList.remove('apples');

    grid[player.row][player.col] = 0;

    player.row = 9;
    player.col = 14;
    player.dir = 'unmoving';

    cellId = 'cell' + player.row + '-' + player.col
    document.getElementById(cellId).classList.add('player');

    grid[player.row][player.col] = 2;

    apples.row = 7;
    apples.col = 7;

    cellId = 'cell' + apples.row + '-' + apples.col
    document.getElementById(cellId).classList.add('apples');

    grid[player.row][player.col] = 3;

    document.getElementById('game-over').innerHTML = 'Rip Off of Snake';
    document.getElementById('game-over').style.color = 'white';
    document.getElementById('length').innerHTML = 'Play a game of rip off snake that really emphasizes "rip off"';
}


// //When the player eats an apple add 2 to the player
// //Add player location to empty array 
// player2.push([player.row, player.col]);

// if (player.row == apples.row && player.col == apples.col) {
//     cellId = 'cell' + apples.row + '-' + apples.col
//     document.getElementById(cellId).classList.remove('apples');

//     //Add apple to random location on the grid
//     apples.row = Math.randomInt(1, 19);
//     apples.col = Math.randomInt(1, 29);

//     cellId = 'cell' + apples.row + '-' + apples.col
//     document.getElementById(cellId).classList.add('apples');

//     grid[apples.row][apples.col] = 3;

//     //Increase the length of the player when an apple is eaten
//     numApples += 2;
// }

// //Remove player from previous location (remove the tail) 
// if (player2.length == numApples) {
//     player.row = player2[0][0];
//     player.col = player2[0][1];

//     cellId = 'cell' + player.row + '-' + player.col
//     document.getElementById(cellId).classList.remove('player');

//     player2.shift();
// }

// //Stop game when the player passes the grid 
// if (newRow < 1 || newRow > NUM_ROWS - 2 || newCol < 1 || newCol > NUM_COLS - 2) {
//     document.getElementById('game-over').innerHTML = 'GAME OVER';
//     document.getElementById('game-over').style.color = 'yellow';
//     document.getElementById('length').innerHTML = 'Length:' + ' ' + numApples;
//     player.dir = 'unmoving';
// }

// //Update class and grid of new player location (the head of the snake) 
// player.row = newRow;
// player.col = newCol;

// cellId = 'cell' + player.row + '-' + player.col
// document.getElementById(cellId).classList.add('player');

// grid[player.row][player.col] = 2;

// //Stop game when the the location of the head equals any point in the body
// for (i = 0; i < player2.length; i++) {
//     if (player.row == player2[i][0] && player.col == player2[i][1]) {
//         document.getElementById('game-over').innerHTML = 'GAME OVER';
//         document.getElementById('game-over').style.color = 'yellow';
//         document.getElementById('length').innerHTML = 'Length:' + ' ' + numApples;
//         player.dir = 'unmoving';
//     }
// }