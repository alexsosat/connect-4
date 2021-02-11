//Selectors
var tableRow = document.getElementsByTagName('tr');
var tableCell = document.getElementsByTagName('td');
var tableSlot = document.querySelector('.slot');
const playerTurn = document.querySelector('.player-turn');
const reset = document.querySelector('.reset');

//add click events to each cell of the game
for (let i = 0; i < tableCell.length; i++) {
    tableCell[i].addEventListener('click', (e) => {
        console.log(`${e.target.parentElement.rowIndex},${e.target.cellIndex}`);
    })
}


//Players name assignation prompts
while (!player1) {
    var player1 = prompt('Jugador 1: Escribe tu nombre, serás el color rojo');
}

player1Color = 'red';

while (!player2) {
    var player2 = prompt('Jugador 2: Escribe tu nombre, serás el color amarillo');
}

player2Color = 'yellow';

//Initial turn variables
var currentPlayer = 1;
playerTurn.textContent = `Es el turno de: ${player1}!`;


//Player select column logic with their respective colors
Array.prototype.forEach.call(tableCell, (cell) => {
    cell.addEventListener('click', changeColor);
    cell.style.backgroundColor = 'white';
});

function changeColor(e) {
    let column = e.target.cellIndex;
    let row = [];

    for (let i = 5; i > -1; i--) {
        if (tableRow[i].children[column].style.backgroundColor == 'white') {
            row.push(tableRow[i].children[column]);
            if (currentPlayer === 1) {
                row[0].style.backgroundColor = player1Color;
                if (horizontalCheck() || verticalCheck()) {
                    return (alert('winner'));
                }
                playerTurn.textContent = `Es el turno de: ${player2}!`;
                return currentPlayer = 2;
            } else {
                row[0].style.backgroundColor = player2Color;
                playerTurn.textContent = `Es el turno de: ${player1}!`;
                return currentPlayer = 1;
            }
        }
    }
}


//Win validation methods
function colorMatchCheck(one, two, three, four) {
    return (one === two && one === three && one === four && one !== 'white')
}

function horizontalCheck() {
    for (let r = 0; r < tableRow.length; r++) {
        for (let c = 0; c < 4; c++) {
            if (colorMatchCheck(tableRow[r].children[c].style.backgroundColor, tableRow[r].children[c + 1].style.backgroundColor,
                tableRow[r].children[c + 2].style.backgroundColor, tableRow[r].children[c + 3].style.backgroundColor)) {
                return true;
            }
        }
    }
};

function verticalCheck() {
    for (let c = 0; c < 7; c++) {
        for (let r = 0; r < 3; r++) {
            if (colorMatchCheck(tableRow[r].children[c].style.backgroundColor, tableRow[r + 1].children[c].style.backgroundColor,
                tableRow[r + 2].children[c].style.backgroundColor, tableRow[r + 3].children[c].style.backgroundColor)) {
                return true;
            }
        }
    }
}



