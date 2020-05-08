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



function start () {

    firstNode = new State();
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++){
            firstNode.tab[i][j] = document.querySelector("#pos" + positions[i*3 + j]).innerHTML;
        }
    }

    firstNode.search0();
    firstNode.possibleMoves();
    firstNode.heuristica();
    frontier.push(firstNode);

    while (frontier != null){
        console.log("loop" , frontier.length);
        console.log(frontier[0].tab);
        
        var minimum = frontier[0].h;
        var best = 0;
        for (indice = 0; indice < frontier.length; indice ++){
            if (minimum > frontier[indice].h){
                minimum = frontier[indice].h;
                best = indice;
            }
        }
        var actualNode = frontier.pop(best);
        visiteds.push(actualNode);
        actualNode.search0();
        //actualNode.possibleMoves();
        actualNode.heuristica();

        if (JSON.stringify(actualNode.tab)==JSON.stringify(goal)) {
            console.log("FIM");
        }

        for (var element of actualNode.availableMoves) {
            console.log(element);   
            novaMatriz = [];
            Object.assign(novaMatriz,move(actualNode, element));
            console.log(move(actualNode, element)[0]);
            
            newNode = new State()
            newNode.pai = actualNode;
            newNode.tab = Object.assign({}, novaMatriz);
            newNode.search0();
            newNode.possibleMoves();
            newNode.heuristica();
            frontier.push(newNode);
            //console.log("new node");
            //console.log(actualNode.tab[0]);
            //console.log(actualNode.tab[1]);
            //console.log(actualNode.tab[2]);
        };
    }
}
function move(state, direction){
    let matriz = state.tab.slice();
    matriz = JSON.stringify(matriz);
    matriz = JSON.parse(matriz);
    let row = state.row0;
    var column = state.column0;
    switch (direction) {
        case "ArrowUp":
            var aux = matriz[row - 1][column];
            matriz[row - 1][column] = 0;
            matriz[row][column] = aux;
            console.log(typeof(matriz));
            return matriz;
            break;
        case "ArrowDown":
            var aux = matriz[row + 1][column];
            matriz[row + 1][column] = 0;
            matriz[row][column] = aux;   
            console.log(typeof(matriz));         
            return matriz;
            break;
        case "ArrowLeft":
            var aux = matriz[row][column - 1];
            matriz[row][column - 1] = 0;
            matriz[row][column] = aux;
            return matriz;
            break;
        case "ArrowRight":
            var aux = matriz[row][column + 1];
            matriz[row][column + 1] = 0;
            matriz[row][column] = aux;
            return matriz;
            break;
    }
}
