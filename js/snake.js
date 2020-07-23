// SNAKE RECREATION 

//GLOBAL CONSTANTS
const NUM_ROWS = 20;
const NUM_COLS = 30;

//Creat an array to represent a grid 
//The grid will start at 0 in the top left corner
let grid = createGridArray();

//Add an apple to the grid array (red div)
let apples = {
    row: 7,
    col: 7
}

grid[apples.row][apples.col] = 3;

//Add a player to the grid array (green div)
let player = {
    row: 9,
    col: 14,
    dir: 'unmoving'
}

grid[player.row][player.col] = 2;

//Add the location of player
let player2 = [];

//Length of player
let numApples = 2;

//Create divs to model the grid array 
createDivGrid(grid);


//Player Movement - Key Event Listeners 
document.addEventListener('keydown', setDirection);


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
setInterval(testDirection, 500);

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
    if (player.row == apples.row && player.col == apples.col) {
        cellId = 'cell' + apples.row + '-' + apples.col
        document.getElementById(cellId).classList.remove('apples');

        //Add apple to random location on the grid
        apples.row = Math.randomInt(0, 20);
        apples.col = Math.randomInt(0, 30);

        cellId = 'cell' + apples.row + '-' + apples.col
        document.getElementById(cellId).classList.add('apples');

        grid[apples.row][apples.col] = 3;

        //Increase the length of the player when an apple is eaten
        numApples += 2;
    }

    //Add player location to empty array 
    player2.push([player.row, player.col]);

    //Remove player from previous location (remove the tail) 
    if (player2.length == numApples) {
        player.row = player2[0][0];
        player.col = player2[0][1];

        cellId = 'cell' + player.row + '-' + player.col
        document.getElementById(cellId).classList.remove('player');

        player2.shift();
    }

    //Stop game when the player passes the grid 
    if (newRow < 0 || newRow > NUM_ROWS - 1 || newCol < 0 || newCol > NUM_COLS - 1) {
        document.getElementById('game-over').innerHTML = 'GAME OVER'; 
        document.getElementById('game-over').style.fontSize = '25px'; 
        document.getElementById('game-over').style.color = 'yellow'; 
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
            document.getElementById('game-over').style.fontSize = '25px'; 
            document.getElementById('game-over').style.color = 'yellow'; 
            player.dir = 'unmoving'; 
        }
    }
}