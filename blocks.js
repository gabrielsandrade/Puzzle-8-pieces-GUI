const randBtn = document.querySelector("#randBtn").addEventListener('click', rand);
function rand(){
    const positions = ["00", "01", "02", "10", "11", "12", "20", "21", "22"];

    function random(list) {
        const sorteado = true;
        while (sorteado == true){
            var rand = parseInt(Math.random() * 9);
            if (list.includes(rand) == false){
                return rand;
            }
        }
    }

    var list = [];
    for (var i = 0; i < 9; i++){
        var rand = random(list);
        list.push(rand); 
    }

    const blocks = document.querySelectorAll(".block");
    blocks.forEach((element, index) => {
        element.id = "pos" + positions[list[index]];
    });
}

const buttons = document.querySelector("#buttons");
buttons.addEventListener('click', event => {
    moveKey(event.target.id);
});

window.addEventListener('keyup', event => {
    //move(event.target.id);
    moveKey(event.key);
});

const starT = document.querySelector("#start");
starT.addEventListener('click', start);

function moveKey(direction){
    const currentPosition = document.querySelector(".block0");
    var row = currentPosition.id[currentPosition.id.length - 2];
    var column = currentPosition.id[currentPosition.id.length - 1];
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