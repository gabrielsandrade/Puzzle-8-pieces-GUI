const buttons = document.querySelector("#buttons");
var matriz = [[0,1,2], [3,4,5], [6,7,8]];

buttons.addEventListener('click', event => {
    move(event.target.id);
});

window.addEventListener('keyup', event => {
    //move(event.target.id);
    move(event.key);
    
});

function move(direction) {
    console.log(direction);
    const currentPosition = document.querySelector(".block0");
    console.log(possibleMove(currentPosition, direction));
}

function possibleMove(currentPosition, direction){
    var row = currentPosition.id[currentPosition.id.length - 2];
    var column = currentPosition.id[currentPosition.id.length - 1];
    console.log(row, column);
    switch (direction) {
        case "ArrowUp":
            if (row == "0") {
                return false;
            } else {
                var row2 = parseInt(row) - 1;
                var block = document.querySelector("#pos" + row2 + column);
                const aux = currentPosition.id;
                currentPosition.id = block.id;
                block.id = aux;
                return true;
            }
            break;
        case "ArrowDown":
            if (row == "2") {
                return false;
            } else {
                var row2 = parseInt(row) + 1;
                var block = document.querySelector("#pos" + row2 + column);
                const aux = currentPosition.id;
                currentPosition.id = block.id;
                block.id = aux;
                return true;
            }
            break;
        case "ArrowLeft":
            if (column == "0") {
                return false;
            } else {
                var column2 = parseInt(column) - 1;
                var block = document.querySelector("#pos" + row + column2);
                const aux = currentPosition.id;
                currentPosition.id = block.id;
                block.id = aux;
                return true;
            }
            break;
        case "ArrowRight":
            if (column == "2") {
                return false;
            } else {
                var column2 = parseInt(column) + 1;
                var block = document.querySelector("#pos" + row + column2);
                const aux = currentPosition.id;
                currentPosition.id = block.id;
                block.id = aux;
                return true;
            }
            break;
    }
}